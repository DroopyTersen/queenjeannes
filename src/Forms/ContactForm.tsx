import React from "/web_modules/react.js";

export default function ContactForm(props: ContactFormProps) {
  return (
    <div className="form-wrapper link-target" id="order-form">
      <form className="form" name="contact" method="post">
        <h2 className="form__title">{props.title}</h2>
        <input type="hidden" name="form-name" value="contact" />
        <p>
          Let me know what you need and I can work with you! I have substitutes for most allergens.
        </p>
        <div className="form__control">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address..."
            required
            defaultValue={props.email}
          />
        </div>
        <div className="form__control">
          <label htmlFor="subject">Subject</label>
          <input
            name="subject"
            type="text"
            required
            defaultValue={props.subject}
            placeholder="Ex: Queen Jeanne's Order Request"
          />
        </div>
        <div className="form__control">
          <textarea name="message" defaultValue={props.body} />
        </div>
        <div className="form__actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function TextField({
  name,
  label = "",
  initial = "",
  multiline = false,
  onChange,
  ...rest
}: TextFieldProps) {
  let [value, setValue] = React.useState(initial);
  let Input = multiline ? "textarea" : "input";
  return (
    <div className="form__control">
      {label && <label htmlFor={name}>{label}</label>}
      <Input
        name={name}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        {...rest}
      />
    </div>
  );
}

interface TextFieldProps {
  name: string;
  onChange: (name: string, value: string) => void;
  initial?: string;
  label?: string;
  multiline?: boolean;
  [any: string]: any;
}

export interface ContactFormProps extends FormSubmission {
  title?: string;
}

export interface FormSubmission {
  email?: string;
  subject?: string;
  body?: string;
}
