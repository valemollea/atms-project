import React, { useState, useEffect, createRef } from 'react';
import { Form, Col, Button, ButtonGroup, Alert } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import ReCaptchaAsyncHook from './ReCaptchaAsyncHook';

const AtmsForm = ({ onAtmsSubmit }) => {
  //SET INITIAL STATES
  //Form
  const [long, setLong] = useState({ "value": "", "valid": false, "message": null });
  const [lat, setLat] = useState({ "value": "", "valid": false, "message": null });
  const [red, setRed] = useState({ "value": "", "valid": false, "message": null });
  const [validated, setValidated] = useState(null);
  //For Get Current Geolocation
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //ReCaptcha
  const [recaptcha, setRecaptch] = useState(null);
  const [rcValidation, rcError] = ReCaptchaAsyncHook(recaptcha)

  const recaptchaRef = createRef();
  const key = ""; //Add your key

  useEffect(() => {
    if (lat.value && long.value && loading) {
      setLoading(false);
    }
  }, [lat, long, loading]);

  //Geolocation
  const userRequestGeolocation = () => {
    setErrorMessage("");
    setLoading(true);
    window.navigator.geolocation.getCurrentPosition(
      position => {
        setLat({ "value": position.coords.latitude, "valid": true, "message": null });
        setLong({ "value": position.coords.longitude, "valid": true, "message": null });
      },
      err => setErrorMessage(err.message)
    );
  };

  //Recaptcha
  const verifyRecaptcha = async () => {
    var value = recaptchaRef.current.getValue();
    setRecaptch(value);
  }

  const resetReCaptcha = () => {
    setRecaptch(null);
    recaptchaRef.current.reset();
  }

  //Form Handlers
  const onInputLatChange = event => {
    if (event.target.value === "") {
      setLat({ "value": "", "valid": false, "message": null });
    } else {
      if (!(isFinite(event.target.value) && Math.abs(event.target.value) <= 90)) {
        setLat({ "value": event.target.value, "valid": false, "message": "Formato incorrecto" });
      } else {
        setLat({ "value": event.target.value, "valid": true, "message": null });
      }
    }
  };

  const onInputLongChange = event => {
    if (event.target.value === "") {
      setLong({ "value": "", "valid": false, "message": null });
    } else {
      if (!(isFinite(event.target.value) && Math.abs(event.target.value) <= 180)) {
        setLong({ "value": event.target.value, "valid": false, "message": "Formato incorrecto" });
      } else {
        setLong({ "value": event.target.value, "valid": true, "message": null });
      }
    }
  };

  const onSelectedRedChange = event => {
    if (!event.target.value.match('^LINK|BANELCO')) {
      setRed({ "value": event.target.value, "valid": false, "message": "Debes elegir una red válida (Link o Banelco)" });
    } else {
      setRed({ "value": event.target.value, "valid": true, "message": null });
    }
  };

  const checkValidations = () => {
    setValidated(true);
    if (!lat.value) {
      setLat({ "value": lat.value, "valid": false, "message": "Debes ingresar una latitud" });
    }
    if (!long.value) {
      setLong({ "value": long.value, "valid": false, "message": "Debes ingresar una longitud" });
    }
    if (!red.value) {
      setRed({ "value": red.value, "valid": false, "message": "Debes ingresar una red" });
    }
    return lat.valid && long.valid && red.valid;
  }

  const handleSubmit = event => {
    event.preventDefault();
    var valid = checkValidations();
    if (rcValidation && valid) {
      var request = `{"long": ${long.value}, "lat": ${lat.value}, "red": "${red.value}"}`;
      request = JSON.parse(request);
      return onAtmsSubmit(request);
    }
  }

  return (
    <div className="card mt-2">
      <div className="card-body">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Label className="text-dark text-sm">Agrega tus coordenadas:</Form.Label>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label className="text-muted" style={{ fontSize: ".9rem" }}>Latitud:</Form.Label>
              <Form.Control
                name="lat"
                type="text"
                placeholder="Latitud"
                value={lat.value}
                onChange={onInputLatChange}
                className={!lat.valid ? !lat.message ? "regular" : "is-invalid" : "is-valid"}
              />
              <Form.Control.Feedback type="invalid">
                {lat.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className="text-muted" style={{ fontSize: ".9rem" }} >Longitud:</Form.Label>
              <Form.Control
                name="long"
                type="text"
                placeholder="Longitud"
                value={long.value}
                className={!long.valid ? !long.message ? "regular" : "is-invalid" : "is-valid"}
                onChange={onInputLongChange}
              />
              <Form.Control.Feedback type="invalid">
                {long.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {errorMessage !== "" ? <Alert variant="danger">{errorMessage}</Alert> : null}
          <Button variant="outline-info" className="mb-3" onClick={userRequestGeolocation}>
            Completar con tu ubación
            {loading && errorMessage === "" ? (<span className="spinner-border ml-2 spinner-border-sm" role="status" aria-hidden="true"></span>) : ""}
          </Button>
          <Form.Row className={`justify-content-center border-top border-bottom ${!red.valid ? !red.message ? "regular" : "invalid" : "valid"}`}>
            <label className="text-dark mt-3 w-100">Selecciona tu red de cajeros:</label>
            <ButtonGroup
              toggle
              value={red}
              name="red"
              className="mb-3 mt-2 justify-content-center"
            >
              <Form.Label htmlFor="option1" className={`btn ${red.value === "LINK" ? 'btn-info' : 'btn-outline-info'}`}>Link</Form.Label>
              <Form.Control
                className="mr-2 d-none"
                id="option1"
                value="LINK"
                name="options"
                type="radio"
                checked={red.value === "LINK"}
                onChange={onSelectedRedChange}
              >
              </Form.Control>
              <Form.Label htmlFor="option2" className={`btn ${red.value === "BANELCO" ? 'btn-info' : 'btn-outline-info'}`}>Banelco</Form.Label>
              <Form.Control
                className="d-none"
                id="option2"
                value="BANELCO"
                name="options"
                type="radio"
                checked={red === "BANELCO"}
                onChange={onSelectedRedChange}
              >
              </Form.Control>
            </ButtonGroup>
            <Form.Control.Feedback type="invalid">
              {red.message}
            </Form.Control.Feedback>
          </Form.Row>
          <Form.Row className="justify-content-center py-3 border-bottom">
            <ReCAPTCHA
              id="recaptcha"
              ref={recaptchaRef}
              sitekey={key}
              onChange={verifyRecaptcha}
            />
            {!rcValidation && rcError
              ? <Alert variant="danger" className={`mt-3 mb-0 w-100 ${!recaptcha ? "d-none" : "show"}`} onClose={resetReCaptcha} dismissible>{rcError}</Alert>
              : !recaptcha && validated
                ? <Form.Control.Feedback type="invalid" className="d-block">Debes validar el Captcha</Form.Control.Feedback>
                : null}
          </Form.Row>
          <Button variant="info" type="submit" className="my-3">Buscar cajeros</Button>
        </Form>
      </div>
    </div>
  );
}

export default AtmsForm;