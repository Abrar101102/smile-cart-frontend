import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Typography } from "neetoui";
import { isNotNil, append } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

import { Header, PageNotFound, PageLoader } from "../commons";
import AddToCart from "../commons/AddToCart";

// import { IMAGE_URLS } from "./constants";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { slug } = useParams();

  const [isError, setIsError] = useState(false);
  const fetchProduct = async () => {
    try {
      const product = await productsApi.show(slug);
      setProduct(product);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  if (isError) return <PageNotFound />;

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrl,
    imageUrls,
    availableQuantity,
  } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-6 pb-6">
      <Header showBackButton title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <AddToCart {...{ availableQuantity, slug }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
