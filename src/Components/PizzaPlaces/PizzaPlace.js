import React from 'react';

var PizzaPlace = (props) => {

    const {title, vicinity, categoryTitle} = props.placedata;

    //credit for this quickie method to turn the HTML breaks in the
    //vicinity string to HTML:
    //https://stackoverflow.com/questions/38850661/outputting-plain-text-with-br-tags-in-jsx
    function textToHtml(html)
    {
        let arr = html.split(/<br\s*\/?>/i);
        return arr.reduce((el, a) => el.concat(a, <br />), []);
    }    

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{textToHtml(vicinity)}</p>
                <p className="card-text">
                    <small className="text-muted">{categoryTitle}</small>
                </p>
            </div>
        </div>
    );
}

export default PizzaPlace;