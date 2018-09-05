import React, { Component } from 'react';
import { connect } from 'react-redux'
import ModalAdd from './ModalAdd'
import ModalDelete from './ModalDelete'
import ModalChange from './ModalChange'

class ListPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      modalAdd: false,
      modalDelete: false,
      modalChange: false,
      phoneId: 0
    }
  }

  toggleAdd = () => {
    this.setState({
      modalAdd: !this.state.modalAdd
    })
  }

  toggleDelete = (id) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      phoneId: id
    })
  }

  toggleChange = (id) => {
    this.setState({
      modalChange: !this.state.modalChange,
      phoneId: id
    })
  }

  listPhone = () => {
    const {phonenumber} = this.props.userInfo
    if (!phonenumber) {
      return null
    } else {
      return phonenumber.filter(filter => {
        return filter.primary !== true 
      })
      .map((data, index) => {
        return (
          <div className='user-listPhone-content' key={index}>
            <label className='user-listPhone-content-label'>{data.number}</label>
            <div className='user-listPhone-content-button'>
              <button onClick={() => this.toggleChange(data.id)} className='baButton user-dataPhone-button-change'>Ubah</button>
              <button onClick={() => this.toggleDelete(data.id)} className='baButton user-dataPhone-button-change'>Hapus</button>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return (  
      <div className='user-listPhone'>
        <h1>No Hp Terdaftar</h1>
        {this.listPhone()}
        <button onClick={this.toggleAdd} className='baButton user-dataPhone-button-change'>Tambah No Baru</button>
        <ModalAdd isOpen={this.state.modalAdd} toggle={this.toggleAdd}/>
        <ModalDelete isOpen={this.state.modalDelete} toggle={this.toggleDelete} phoneId={this.state.phoneId}/>
        <ModalChange isOpen={this.state.modalChange} toggle={this.toggleChange} phoneId={this.state.phoneId}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ListPhone)

export default connectComponent