import "../styles/CheckoutFooter.scss"

export const CheckoutFooter = () => {

  return (
    <>
      <div className="CheckoutFooter">
        <div className="CheckoutFooter_Contact">
          <div className="CheckoutFooter_Contact_Item">Contact Us</div>
          <div className="CheckoutFooter_Contact_Item Chat">Live Chat</div>
          <div className="CheckoutFooter_Contact_Item">1.877.263.9300</div>
        </div>
        <div className="CheckoutFooter_Lists">
          <p className="CheckoutFooter_Lists_Item">Shipping Policy</p>
          <p className="CheckoutFooter_Lists_Item">Privacy Policy (Last Updated: 9/10/20)</p>
          <p className="CheckoutFooter_Lists_Item">Terms of Use</p>
          <p className="CheckoutFooter_Lists_Item">Accessibility Statement</p>
          <p className="CheckoutFooter_Lists_Text">© lululemon athletica 1818 Cornwall Ave,
            Vancouver BC V6J 1C7</p>
        </div>
      </div>
    </>
  )
}