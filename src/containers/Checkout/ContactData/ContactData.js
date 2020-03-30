import React from 'React';
import Button from '../../../components/UI/Button/Button';


class ContactData extends React.Component{
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      pinCode: '',
      state: ''
    }
  }
  render(){
    return (
      <div>
        <h4>Enter your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name"/>
          <input type="email" name="email" placeholder="Your Email"/>
          <input type="street" name="street" placeholder="street"/>
          <input type="text" name="street" placeholder="Pin Code"/>
          <input type="text" name="state" placeholder="State"/>
          <Button btnType='Success'>Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;