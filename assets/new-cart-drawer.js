const cartDrawerActions = () => {
    async function changeCartItemQuantity(lineKey, quantity) {
       return await fetch(window.Shopify.routes.root + 'cart/change.js', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id: lineKey, quantity: quantity })
       })
       .then(response => response.json())
       .then(() => {
         updateCartDrawer();
       })
       .catch(error => {
         console.error("Error changing cart quantity:", error);
       });
     }
   
     function attachCartListeners() {
       document.querySelector('.cart-drawer-close')?.addEventListener('click', () => {
         document.querySelector('.cart-drawer-la')?.classList.remove('cart-drawer-active-la');
       });
   
       document.querySelectorAll('.cart-qty-plus').forEach(button => {
         button.addEventListener('click', () => {
           const parent = button.closest('.cart-drawer-item');
           const input = parent.querySelector('.cart-qty-input');
           const lineKey = parent.dataset.lineKey;
           let newQuantity = parseInt(input.value) + 1;
   
           input.value = newQuantity;
           changeCartItemQuantity(lineKey, newQuantity);
         });
       });
   
       document.querySelectorAll('.cart-qty-minus').forEach(button => {
         button.addEventListener('click', () => {
           const parent = button.closest('.cart-drawer-item');
           const input = parent.querySelector('.cart-qty-input');
           const lineKey = parent.dataset.lineKey;
           let newQuantity = Math.max(parseInt(input.value) - 1, 1);
   
           input.value = newQuantity;
           changeCartItemQuantity(lineKey, newQuantity);
         });
       });
   
       document.querySelectorAll('.cart-remove-btn').forEach(el => {
           el.addEventListener("click", async (e) => {
             alert('clear')
  
             e.preventDefault(); 
             e.stopPropagation();
             console.log(el);
             
             const lineKey = el.dataset.removeKey;
             console.log("Removing item with key:", lineKey);
             
             try {
               const response = await fetch(window.Shopify.routes.root + 'cart/change.js', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ id: lineKey, quantity: 0 })
               });
               await updateCartDrawer();
               if (!response.ok) {
                 throw new Error("Failed to remove item from cart.");
               }
              
   
             } catch (error) {
               console.log('Error:', error); 
             }
           });
         });
         
         async function updateCartDrawer() {
           try {
             const response = await fetch('/?section_id=new-cart-drawer');
             const responseText = await response.text();
             const parser = new DOMParser();
             const doc = parser.parseFromString(responseText, 'text/html');
             const newDrawerContent = doc.querySelector('.cart-drawer-la');
             const cartDrawerContainer = document.querySelector('.cart-drawer-la');
         
             if (cartDrawerContainer && newDrawerContent) {
               cartDrawerContainer.innerHTML = newDrawerContent.innerHTML;
               attachCartListeners(); 
             }
           } catch (error) {
             console.log("Error updating cart drawer", error);
           }
         }
     }
   
    
   
     attachCartListeners();
   };
   
   document.addEventListener('DOMContentLoaded', cartDrawerActions);
   document.addEventListener('section:updated', cartDrawerActions);
   