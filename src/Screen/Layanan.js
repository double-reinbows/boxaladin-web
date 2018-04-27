import React, {Component} from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

class Layanan extends Component {
  constructor(){
    super()

    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleChangeSubject = this.handleChangeSubject.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    
    this.state = {
      subject: '',
      content: '',
      email: '',
      receiver: 'info@boxaladin.com',
      notif: ''
    }
  }

  handleChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  handleChangeSubject(e){
    this.setState({
      subject: e.target.value
    })
  }

  handleChangeContent(e){
    this.setState({
      content: e.target.value
    })
  }

  sentContent(e){
    e.preventDefault()
    
    if (this.state.email === '') {
      this.setState({
        notif: 'Email Tidak Boleh Kosong'
      })
    } else if (this.state.subject === ''){
      this.setState({
        notif: 'Subject Harus Diisi'
      })
    } else if (this.state.content === ''){
      this.setState({
        notif: 'Content Harus Diisi'
      })
    } else {
      console.log('state', this.state)
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST}/serviceemail`,
        headers: {
          key: process.env.REACT_APP_KEY
        },
        data: {
          email: this.state.email,
          subject: this.state.subject,
          content: this.state.content,
          receiver: this.state.receiver
        }
      })
      .then((data) => {
        this.setState({
          subject: '',
          content: '',
          email: '',
          notif: ''
        })
        console.log("asdsafsaf")    
      }
    )
      .catch(err => console.log(err))
    }
  }
  
  render() {
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
                    <Input className="layanan__input" value={this.state.email} onChange={this.handleChangeEmail} type="email" name="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="layanan__text" for="exampleUrl">Subject</Label>
                    <Input className="layanan__input" value={this.state.subject} onChange={this.handleChangeSubject} type="label" name="label" placeholder="Subject" />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label className="layanan__text" for="exampleText">Content</Label>
                    <Input className="layanan__input__textarea"  value={this.state.content} onChange={this.handleChangeContent} type="textarea" name="text" placeholder="Tulis Keluhan Anda Disini" />
                  </FormGroup>
                  <label className="alert__dompetAladin">{this.state.notif}</label>
                  {/* <FormGroup>
                    <Label className="layanan__text" for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText className="layanan__text" color="white">
                      Max Size = 2mb
                    </FormText>
                  </FormGroup> */}
                  
                  <button className="layanan__button">Submit</button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default Layanan
