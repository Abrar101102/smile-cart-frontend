import { useState } from "react";

import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Pagination, Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useFetchProducts } from "src/hooks/reactQuery/useProductsApi";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

import Header from "../commons/Header";
import PageLoader from "../commons/PageLoader";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  const debouncedSearchKey = useDebounce(searchKey);

  const productsParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => {
              setSearchKey(event.target.value);
              setCurrentPage(DEFAULT_PAGE_INDEX);
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default withTitle(ProductList);
