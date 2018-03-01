import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../Login';


describe('Login Component', () => {
 
    // make our assertion and what we expect to happen 
    it('should render without throwing an error', () => {
      expect(shallow(<Login />).exists(<form className='login'></form>)).toBe(true)
    })

    it('renders a email input', () => {
      expect(shallow(<Login />).find('#email').length).toEqual(1)
     })
    it('renders a password input', () => {
      expect(shallow(<Login />).find('#password').length).toEqual(1)
     })


   })

