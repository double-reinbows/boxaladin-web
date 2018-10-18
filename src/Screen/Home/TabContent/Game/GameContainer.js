import React, { Component, Fragment } from 'react';
import MobileLegend from './Content/MobileLegend'

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      tab: 0
    }
  }

  renderContent = () => {
    const {tab} = this.state
    switch (tab) {
      case 1:
        return (
          <MobileLegend
            onClick={this.props.onClick}
          />
          )
      case 2:
      return (
          <h2>Coming Soon</h2>
        )
      default:
        return null
    }
  }

  changeContent = (value) => {
    this.setState({
      tab: value
    })
  }

  gameTabButton = () => {
    const game = [
      {onClick: () => this.changeContent(1), disabled: false, alt: "Mobile Legend", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/MOBILE+LEGENDS+LOGO.png'},
      {onClick: () => this.changeContent(2), disabled: true, alt: "PUBG", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/PUBG+COMING+SOON.png'},
      {onClick: () => this.changeContent(2), disabled: true, alt: "Gemscool", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/GEMSCOOL+COMING+SOON.png'},
      {onClick: () => this.changeContent(2), disabled: true, alt: "Lyto", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/LYTO+COMING+SOON.png'},
      {onClick: () => this.changeContent(2), disabled: true, alt: "Steam", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/STEAM+WALLET+COMING+SOON.png'},
      {onClick: () => this.changeContent(2), disabled: true, alt: "Google Play", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/GOOGLE+PLAY+COMING+SOON.png'},
      {onClick: () => this.changeContent(2), disabled: true, alt: "PS", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/PLAYSTATION+COMING+SOON.png'},
      {onClick: () => this.changeContent(2), disabled: true, alt: "Megaxus", src: 'https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Pulsa/MEGAXUS+COMING+SOON.png'},
    ] 

    return game.map((item, index) => {
      return (
        <button disabled={item.disabled} className="homecontent__game__buttonTab" onClick={item.onClick}><img src={item.src} alt={item.alt}/></button>
      )
    })
  }

  render() {
    return (  
      <Fragment>
        <div className="homecontent__game">
          {this.gameTabButton()}
        </div>
        {this.renderContent()}
      </Fragment>
    );
  }
}

export default GameContainer;