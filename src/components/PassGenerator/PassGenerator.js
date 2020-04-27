import React from "react";
import "./PassGenerator.scss";

class PassGenerator extends React.Component {
  state = {
    mixed: false,
    special: false,
    length: 0,
    randomPass: "",
  };

  onLengthChangeHandler = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  onCheckChangeHandler = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: !this.state[name],
    });
  };

  randomPassGenerator = (userLength, mixed, special) => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specials = "@%+/\\'!#$^?:,:(){}[]~-_.";
    let finalString = "";

    if (mixed && special) {
      finalString = finalString.concat(chars, chars.toUpperCase(), numbers, specials);
    } else if (special) {
      finalString = finalString.concat(chars, numbers, specials);
    } else if (mixed) {
      finalString = finalString.concat(chars, chars.toUpperCase(), numbers);
    } else finalString = finalString.concat(chars, numbers);

    const randomIndex = () => {
      return Math.floor(Math.random() * finalString.length);
    };
    let randomPassArray = [];
    while (userLength) {
      randomPassArray.push(finalString[randomIndex()]);
      userLength--;
    }
    return randomPassArray.join("");
  };

  onClickHandler = (e) => {
    e.preventDefault();
    let randomPassVal = this.randomPassGenerator(
      this.state.length,
      this.state.mixed,
      this.state.special
    );
    this.setState({
      randomPass: randomPassVal,
    });
  };

  render() {
    return (
      <form className="pass-generator">
        <h1 className="pass-generator-title">Generate Password</h1>
        <div className="pass-generator-result">
          <label htmlFor="result label">Result</label>
          <input readOnly type="text" name="result" id="result" value={this.state.randomPass} />
          <button type="submit" className="pass-generator-submit" onClick={this.onClickHandler}>
            NEW PASSWORD
          </button>
        </div>

        <div className="pass-generator-settings">
          <p className="title-second">Settings</p>
          <label htmlFor="password-length" className="length label">
            Password length
          </label>
          <input
            type="number"
            name="length"
            id="password-length"
            onChange={this.onLengthChangeHandler}
          />
          <label htmlFor="password-mixed" className="container">
            <input
              type="checkbox"
              name="mixed"
              id="password-mixed"
              onChange={this.onCheckChangeHandler}
            />
            Use mixed case
            <span className="checkmark"></span>
          </label>
          <label htmlFor="password-special" className="container">
            <input
              type="checkbox"
              name="special"
              id="password-special"
              onChange={this.onCheckChangeHandler}
            />
            Use special Characters
            <span className="checkmark"></span>
          </label>
        </div>
      </form>
    );
  }
}

export default PassGenerator;
