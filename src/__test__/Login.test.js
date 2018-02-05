import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../Screen/Login';

// import Adapter from 'enzyme-adapter-react-16';
//
// configure({ adapter: new Adapter() });

// describe what we are testing
describe('<Login />', () => {

 // assert .exists cuman buat cek formnya ada atau ga
   it('rendernya asal ada dulu', () => {
     expect(shallow(<Login />).exists(<form className='form-login'></form>)).toBe(true)
   })

})
