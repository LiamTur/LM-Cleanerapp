import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './Login.css'

function Login() {
 const navigate = useNavigate();

 const [groceriesInput, setGroceriesInput] = useState('');
 const [groceries, setGroceries] = useState([]);

 const handleAddGrocery = (e) => {
   e.preventDefault();
   if (groceriesInput.trim()) {
     const updated = [...groceries, groceriesInput.trim()];
     setGroceries(updated);
     localStorage.setItem('groceries', JSON.stringify(updated));
     setGroceriesInput('');
   }
 };

 const handleLogin = (user) => {
    localStorage.setItem('loggedInUser', user);
    navigate('/chores');
 };

return (
    <>
      <h1>Select your user</h1>
      <button onClick={() => handleLogin('Liam')}>Login as Liam</button>
      <button onClick={() => handleLogin('Moa')}>Login as Moa</button>
	<div className="gform">
      <form onSubmit={handleAddGrocery}>
  	<input
 	type="text"
    	value={groceriesInput}
    	onChange={(e) => setGroceriesInput(e.target.value)}
    	placeholder="Add grocery item"
  	/>
  	<button type="submit">Add</button>
	</form>
	</div>
    </>
  );
}
export default Login;

