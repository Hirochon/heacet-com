import React from 'react'
import { Link } from 'gatsby'
import "./post.scss";


const ContactForm = () => (
  <div className="contact-form">
    <form 
      name="contact" 
      method="POST" 
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
    <input type="hidden" name="form-name" value="contact" />
    <input type="hidden" name="bot-field" />

      <div className="form-group">
        <label>お名前(必須)<abbr title="required"></abbr>
        <input type="text" className="form-control" id="name" name="name" placeholder="お名前" maxLength={30} minLength={2} required autoComplete="name" />
        </label>
      </div>
      <div className="form-group">
        <label>メールアドレス(必須)<abbr title="required"></abbr>
        <input type="email" className="form-control" id="email" name="email" placeholder="" pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" required autoComplete="email" />
        </label>
      </div>
      <div className="form-group">
        <label>お問い合わせ内容(必須)<abbr title="required"></abbr>
        <textarea className="form-control" id="contact" name="content" rows={8} required></textarea>
        </label>
      </div>

      <div className="form-group">
      <button type="submit">送信</button>
      </div>
    </form>
    <Link to="/">home</Link>
  </div>
)

export default ContactForm