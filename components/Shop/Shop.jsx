"use client";

// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAPI } from "@/actions/products.actions";
import { getProductSettings } from "@/redux/slices/productSettings.js";
import { getProducts, getMoreProducts } from "@/redux/slices/products.js";
import Cards from "@/components/Products/Cards";
import SortingPanel from "./SortingPanel";
import Filters from "./Filters";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// ** Third Party Imports
import { useInView } from "react-intersection-observer";

export default function Shop({
  dict,
  pathname,
  productsData,
  productSettingsData,
}) {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // States
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [trending, setTrending] = useState(null);
  const [inStock, setInStock] = useState(null);
  const [showFilter, setShowFilter] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [filterOrSortChanged, setFilterOrSortChanged] = useState(false);

  // Infinite scroll hook
  const [scrollTrigger, isInView] = useInView();

  // Products & product settings
  const products = useSelector((state) => state.products.products);

  const productSettings = useSelector(
    (state) => state.productSettings.productSettings
  );

  // Infinite scroll
  const fetchProducts = async (reset = false) => {
    setIsLoading(true);

    if (reset) {
      setPage(1);
      setHasMoreData(true);
      dispatch(getProducts([]));
    }

    const response = await fetchProductsAPI({
      page: reset ? 0 : page,
      limit: 8,
      category,
      priceRange,
      trending,
      inStock,
      sortBy,
    });

    if (
      response?.totalCount ===
      products?.length + response?.products?.length
    ) {
      setHasMoreData(false);
    }

    dispatch(
      reset
        ? getProducts(response?.products)
        : getMoreProducts(response?.products)
    );

    setTotalCount(response?.totalCount);

    // Incrementing page number for infinite scroll only
    if (!reset) {
      setPage((prevPage) => prevPage + 1);
    }

    setIsLoading(false);
  };

  // Initial loading
  useEffect(() => {
    if (productSettingsData) {
      dispatch(getProductSettings(productSettingsData));
    }

    if (productsData) {
      dispatch(getProducts([...productsData?.products]));
      setTotalCount(productsData?.totalCount);
    }
  }, [productsData, productSettingsData]);

  // Setting category for category page
  useEffect(() => {
    if (pathname) {
      setCategory(pathname);
    }
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (isInView && hasMoreData) {
      fetchProducts();
    }
  }, [isInView, hasMoreData]);

  // To handle filter change
  useEffect(() => {
    if (filterOrSortChanged) {
      fetchProducts(true);
      setFilterOrSortChanged(false);
    }
  }, [filterOrSortChanged]);

  const handleFilterChange = (category, priceRange, trending, inStock) => {
    setCategory(category);
    setPriceRange(priceRange);
    setTrending(trending);
    setInStock(inStock);
    setFilterOrSortChanged(true);
  };

  // To handle sorting
  const handleSortByChange = (value) => {
    setSortBy(value);
    setFilterOrSortChanged(true);
  };

  // To handle filter menu (smaller screens)
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div>
      <div className={classes.intro}>
        <div className={classes.content}>
          <Typography variant="h1">{dict.shop.title}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {dict.shop.content}
          </Typography>
        </div>
      </div>
      <SortingPanel
        dict={dict}
        handleSortByChange={handleSortByChange}
        handleShowFilter={handleShowFilter}
        totalCount={totalCount}
      />
      <div className={classes.productsContainer}>
        <Filters
          dict={dict}
          pathname={pathname}
          handleFilterChange={handleFilterChange}
          handleShowFilter={handleShowFilter}
          showFilter={showFilter}
          productSettings={productSettings}
        />
        <div>
          <Cards
            products={products}
            productSettings={productSettings}
            loading={isLoading}
          />
          {!isLoading && products?.length == 0 && (
            <Typography variant="subtitle1" align="center" sx={{ mt: 15 }}>
              {dict.shop.itemsEmpty}
            </Typography>
          )}
          {/* Showing the loader while fetching products */}
          {isLoading && (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <CircularProgress color="primary" size={20} />
            </div>
          )}
        </div>
      </div>
      {/* Infinite scroll trigger*/}
      <div ref={scrollTrigger} />
    </div>
  );
}
