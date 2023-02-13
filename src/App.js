import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Product from "./Product/pages/Product";
import Details from "./Product/pages/Details";
import ProductDescription from "./Product/components/ProductDescription";
import ProductAdditional from "./Product/components/ProductAdditional";
import ProductReviews from "./Product/components/ProductReviews";
import Cart from "./components/Cart/index";
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="products" element={<Product />} />
        <Route path="products/:productId" element={<Details />}>
          <Route path="description" element={<ProductDescription />} />
          <Route path="additional" element={<ProductAdditional />} />
          <Route path="reviews" element={<ProductReviews />} />
        </Route>
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
