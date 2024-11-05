import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { name, password } = data;
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          name: name,
          password: password
        })
      });

      const result = await response.json();

      if (result.error) {
        toast.error(result.error);
      } else {
        setData({ name: '', password: '' });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Username</label>
        <input type='text' placeholder='Enter Username...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <label>Password</label>
        <input type='password' placeholder='Enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button type='submit'>Login</button>
        <Link to='/register'>
            <button type='submit'>register</button>
        </Link>
      </form>
    </div>
  );
}
