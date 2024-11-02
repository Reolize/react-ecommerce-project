import { BsFillBagFill } from "react-icons/bs";

 
const Card = ({ img, title, star, reviews, prevPrice, newPrice, addToCart }) => (
  <section className="card">
    <img src={img} alt={title} className="card-img" />
    <div className="card-details">
      <h3 className="card-title">{title}</h3>
      <section className="card-reviews">
        {/* Render stars based on rating value */}
        {[...Array(star)].map((_, index) => (
          <span key={index}>⭐</span>
        ))}
        <span className="total-reviews">({reviews})</span>
      </section>
      <section className="card-price">
        <div className="price">
          <del>{prevPrice}</del> {newPrice}
        </div>
        <button onClick={addToCart}>Add to Cart</button>
      </section>
    </div>
  </section>
);

export default Card;
