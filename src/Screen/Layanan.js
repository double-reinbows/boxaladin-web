import React, {Component} from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import ModalText from './Components/Modal/ModalText'

class Layanan extends Component {
  constructor(){
    super()    
    this.state = {
      subject: '',
      content: '',
      email: '',
      receiver: 'info@boxaladin.com',
      notif: '',
      modal: false,
      phone: '',
      line: ''
    }
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleChangeLine = (e) => {
    this.setState({
      line: e.target.value
    })
  }

  handleChangePhone = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  handleChangeSubject = (e) => {
    this.setState({
      subject: e.target.value
    })
  }

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  sentContent = (e) => {
    e.preventDefault()
    
    if (this.state.email === '') {
      this.setState({
        notif: 'Email Tidak Boleh Kosong'
      })
    }  else if (this.state.phone === ''){
      this.setState({
        notif: 'No Hp Harus Diisi'
      })
    } else if (this.state.subject === ''){
      this.setState({
        notif: 'Subject Harus Diisi'
      })
    } else if (this.state.line === ''){
      this.setState({
        notif: 'Id Line Harus Diisi'
      })
    } else if (this.state.content === ''){
      this.setState({
        notif: 'Content Harus Diisi'
      })
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/serviceemail`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          email: this.state.email,
          subject: this.state.subject,
          line: this.state.line,
          content: this.state.content,
          receiver: this.state.receiver,
          phone: this.state.phone
        }
      })
      .then((data) => {
        this.setState({
          subject: '',
          content: '',
          email: '',
          line: '',
          notif: '',
          phone: '',
          modal: !this.state.modal
        })
      }
    )
      .catch(err => console.log(err))
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  
  render() {
    console.log(this.state.line)
    return (
      <div className="layanan">
        <div className="layanan__container">
          <h1 className="layanan__text__header">Layanan Bantuan</h1>
            <Container>
            <Row>
              <Col>
                <Form onSubmit={ (e) => this.sentContent(e) }>
                  <FormGroup>
                    <Label className="layanan__text" for="exampleUrl">Email</Label>
                    <Input className="layanan__input" value={this.state.email} onChange={this.handleChangeEmail} type="email" name="email" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="layanan__text" for="exampleUrl">Id LINE</Label>
                    <Input className="layanan__input" value={this.state.line} onChange={this.handleChangeLine} type="label" name="line" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="layanan__text" for="exampleUrl">No Hp</Label>
                    <Input className="layanan__input" value={this.state.phone} onChange={this.handleChangePhone} type="number" name="number"/>
                  </FormGroup>
                  <FormGroup>
                    <Label className="layanan__text" for="exampleUrl">Subject</Label>
                    <Input className="layanan__input" value={this.state.subject} onChange={this.handleChangeSubject} type="label" name="label"/>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label className="layanan__text" for="exampleText">Content</Label>
                    <Input className="layanan__input__textarea"  value={this.state.content} onChange={this.handleChangeContent} type="textarea" name="text" placeholder="Tulis Keluhan Anda Disini" />
                  </FormGroup>
                  <label className="alert__dompetAladin">{this.state.notif}</label>      
                  <div className="layanan__button__container">
                    <button className="layanan__button">Submit</button>
                  </div>            
                </Form>
              </Col>
            </Row>
          </Container>
          <ModalText isOpen={this.state.modal} toggle={this.toggle} text="Email telah terkirim! Tim kami akan segera menghubungi anda, silahkan cek email anda dalam 24 Jam kedepan."/>
        </div>
      </div>
    )
  }
}

export default Layanan
