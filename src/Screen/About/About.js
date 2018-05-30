//@flow
import React from 'react';
import Welcome from './Welcome';
import Advantage from './Advantage';
import Faq from './Faq';

type Props = {};
export default function About(props: Props) {
  return (
    <div>
      <Welcome/>
      <Advantage/>
      <Faq/>
    </div>
    )
}
