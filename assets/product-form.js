if (!customElements.get("product-form")) {
  customElements.define(
    "product-form",
    class ProductForm extends HTMLElement {
      constructor() {
        super();
        this.form = this.querySelector("form");
        this.submitButton = this.querySelector('[type="submit"]');
        this.sizeValueId = null;
        this.hideErrors = this.dataset.hideErrors === "true";
        this.form.querySelector("[name=id]").disabled = false;
        this.loadingSpinner = this.submitButton.querySelector('.loading-overlay__spinner-la');
        this.handleErrorMessage = this.handleErrorMessage.bind(this);
        this.toggleLoadingState = this.toggleLoadingState.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this); 
        this.form.addEventListener("submit", this.onSubmitHandler);
        this.sizePopup = document.querySelector('.size-popup')
        this.bihendSelected = document.querySelector('.bihend-selecet-la')
        this.headerDropdown = document.querySelector(".dropdown-header-la");
        const selectedDropdown = document.querySelectorAll(".dropdown-selected-la");
        this.itemSize = document.querySelectorAll(".available-value-la");
        this.productId = document.querySelector('.product-la')?.getAttribute('data-product-id');
        this.itemSize.forEach((el) => {
          el.addEventListener("click", (e) => {
            const selectedValue = e.target.dataset.value || e.target.textContent.trim();
            this.sizeValueId = e.target.id;
            selectedDropdown.forEach((el) => {
              el.textContent = selectedValue;
              this.headerDropdown.parentElement.classList.remove("active-select-la");
            })
          });
        });
        if (window.innerWidth <= 989) {
          const sizePopup = document.querySelector('.size-popup');
          const sizeButton = document.getElementById('size-popup-btn');
          const headerPositionLa = document.querySelector('.header-la');
          const announcementBarPositionLa = document.querySelector('.announcement_bar-la');
          const bihendSelected = document.querySelector('.bihend-selecet-la');
          this.itemSize && this.itemSize.forEach((el) => {
            el.addEventListener("click", () => {
              sizePopup.classList.remove('size-popup-active');
              document.body.classList.remove("no-scroll-body");
              bihendSelected.classList.remove('bihend-selecet-active-la');
              headerPositionLa?.classList.remove('header-collapsible-overflow-la');
              announcementBarPositionLa?.classList.remove('announcement-collapsible-overflow-la');
            });
          })

          if (sizePopup && sizeButton && bihendSelected) {
              sizeButton.addEventListener('click', () => {
                  sizePopup.classList.add('size-popup-active');
                  headerPositionLa?.classList.add('header-collapsible-overflow-la');
                  announcementBarPositionLa?.classList.add('announcement-collapsible-overflow-la');
                  document.body.classList.add("no-scroll-body");
                  bihendSelected.classList.add('bihend-selecet-active-la');
              });
  
              bihendSelected && bihendSelected.addEventListener('click', () => {
                  sizePopup.classList.remove('size-popup-active');
                  document.body.classList.remove("no-scroll-body");
                  bihendSelected.classList.remove('bihend-selecet-active-la');
                  headerPositionLa?.classList.remove('header-collapsible-overflow-la');
                  announcementBarPositionLa?.classList.remove('announcement-collapsible-overflow-la');
                  
              });
  
              window.addEventListener("resize", () => {
                  if (window.innerWidth > 989) {
                      document.body.classList.remove("no-scroll-body");
                      sizePopup.classList.remove('size-popup-active');
                      bihendSelected.classList.remove('bihend-selecet-active-la');
                      headerPositionLa?.classList.remove('header-collapsible-overflow-la');
                      announcementBarPositionLa?.classList.remove('announcement-collapsible-overflow-la');
                  }
              });
          }
        }

        this.headerDropdown &&
        this.headerDropdown.addEventListener("click", () => {
          this.headerDropdown.parentElement.classList.toggle("active-select-la");
          });
          this.headerDropdown &&  document.addEventListener("click", (e) => {
            if (!this.headerDropdown.parentElement.contains(e.target)) {
              this.headerDropdown.parentElement.classList.remove("active-select-la");
            }
          });
  
       
        if (document.querySelector("cart-drawer")) {
          this.submitButton.setAttribute("aria-haspopup", "dialog");
        }
      }
      updateCartUI(cartData) {
        const totalItems = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector(".cart-count-header-la");
        
        if (cartCount) {
          cartCount.textContent = totalItems;
          cartCount.parentElement.classList.add('product-form-active-la')
        }
      }

      async onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute("aria-disabled") === "true") return;
          this.handleErrorMessage();
          if (this.itemSize.length > 0 && !this.sizeValueId) {
            this.headerDropdown.parentElement.classList.add("active-select-la");
            if (window.innerWidth <= 989) {
                this.sizePopup.classList.add('size-popup-active');
                this.bihendSelected.classList.add('bihend-selecet-active-la');
            }
            return; 
          }
        this.toggleLoadingState(true);
      
        const formData = {
          items: [
            {
              id: this.itemSize.length > 0 ? this.sizeValueId : this.productId,
              quantity: 1,
            },
          ],
        };
      
        try {
          const response = await fetch('/cart/add.js', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          console.log("Response: ", response, "Result: ", result)
          if (response.ok && !result.status) {
            this.showAddedToBag();
            setTimeout(() => {
              this.resetButtonState();
            }, 3000);
            const updatedCartResponse = await fetch("/cart.js");
            const updatedCartData = await updatedCartResponse.json();
            this.updateCartUI(updatedCartData); 
          } else {
            this.handleErrorMessage(result.description || "An error occurred.");
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
          this.handleErrorMessage("Failed to add to cart. Please try again.");
        } finally {
          this.toggleLoadingState(false);
        }
      }

      toggleLoadingState(isLoading) {
        this.submitButton.setAttribute("aria-disabled", isLoading ? "true" : "false");
        this.submitButton.classList.toggle("loading", isLoading);
        this.loadingSpinner.classList.toggle("hidden", !isLoading);

      }
  
      showAddedToBag() {
        this.submitButton.querySelector("span").innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M27.3996 6.2856C27.1705 6.3029 26.9575 6.41301 26.8073 6.59172L12.9037 23.1848L5.81899 15.671C5.73983 15.5864 5.64518 15.5187 5.5405 15.4719C5.43581 15.425 5.32315 15.3999 5.20899 15.398C5.09483 15.396 4.98142 15.4173 4.87529 15.4606C4.76915 15.5038 4.67238 15.5683 4.59055 15.6501C4.42665 15.8144 4.33269 16.0387 4.3292 16.274C4.32571 16.5093 4.41297 16.7365 4.57192 16.9059L12.3216 25.1242C12.4054 25.213 12.5064 25.2829 12.618 25.3294C12.7296 25.3759 12.8494 25.398 12.9697 25.3942C13.0901 25.3904 13.2084 25.3609 13.317 25.3076C13.4257 25.2542 13.5223 25.1781 13.6008 25.0842L28.1187 7.75535C28.2687 7.57658 28.3436 7.34386 28.3268 7.10836C28.31 6.87287 28.2028 6.65388 28.029 6.49955C27.8551 6.34528 27.6287 6.2683 27.3996 6.2856Z" fill="white"/></svg></span>';
      }
  
      resetButtonState() {
        this.submitButton.querySelector("span").textContent = "ADD TO BAG";
      }
      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;
          this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector(".product-form__error-message-wrapper");
        if (!this.errorMessageWrapper) return;

        this.errorMessage =
          this.errorMessage || this.errorMessageWrapper.querySelector(".product-form__error-message");
          this.errorMessageWrapper.toggleAttribute("hidden", !errorMessage);
        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }
  );
}