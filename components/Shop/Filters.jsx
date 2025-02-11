// ** Next, React And Locals Imports
import { useState, useEffect } from "react";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import useStyles from "./styles.js";
import theme from "@/components/Theme/theme.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Third Party Imports
import { HiChevronDown } from "react-icons/hi";

export default function Filters({
  dict,
  pathname,
  handleFilterChange,
  handleShowFilter,
  showFilter,
  productSettings,
}) {
  const { classes } = useStyles();

  // States
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [trending, setTrending] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  // To check small screen
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!isSmallScreen && filtersChanged) {
      applyFilters();
      setFiltersChanged(false);
    }
  }, [filtersChanged]);

  // Setting category for category page
  useEffect(() => {
    if (pathname) {
      setCategories([pathname]);
    }
  }, []);

  // Update state on filter change
  const markFiltersAsChanged = () => {
    setFiltersChanged((prev) => !prev);
  };

  //  To handle filters change
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }

    markFiltersAsChanged();
  };

  const handlePriceRangeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPriceRange((prevPriceRange) => [...prevPriceRange, value]);
    } else {
      setPriceRange((prevPriceRange) =>
        prevPriceRange.filter((range) => range !== value)
      );
    }

    markFiltersAsChanged();
  };

  const handleStockChange = (event) => {
    setInStock(event.target.checked);
    markFiltersAsChanged();
  };

  const handleTrendingChange = (event) => {
    setTrending(event.target.checked);
    markFiltersAsChanged();
  };

  // To apply all filters
  const applyFilters = () => {
    handleFilterChange(categories, priceRange, trending, inStock);
  };

  // To clear all filters
  const handleClearFilters = () => {
    setCategories([]);
    setPriceRange([]);
    setTrending(false);
    setInStock(false);
    markFiltersAsChanged();
  };

  return (
    <div
      className={`${classes.filtersPanel} ${
        showFilter ? classes.filterMenu : ""
      }`}
    >
      <div className={classes.filtersPanelTop}>
        <Typography variant="subtitle1">{dict.shop.filterText}</Typography>
        <Typography variant="subtitle1" onClick={handleClearFilters}>
          {dict.shop.filterClear}
        </Typography>
      </div>
      {/* Categories */}
      <Accordion className={classes.accordion} disableGutters>
        <AccordionSummary expandIcon={<HiChevronDown />}>
          <Typography variant="subtitle1">
            {dict.shop.filterCategory}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {productSettings?.categories?.map((category, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={category}
                    checked={categories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                }
                label={CapitalizeText(category)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {/* Price */}
      <Accordion className={classes.accordion} disableGutters>
        <AccordionSummary expandIcon={<HiChevronDown />}>
          <Typography variant="subtitle1">{dict.shop.filterPrice}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value="0/200"
                  checked={priceRange.includes("0/200")}
                  onChange={handlePriceRangeChange}
                />
              }
              label="0 - 200"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="200/500"
                  checked={priceRange.includes("200/500")}
                  onChange={handlePriceRangeChange}
                />
              }
              label="200 - 500"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {/* Availability */}
      <Accordion className={classes.accordion} disableGutters>
        <AccordionSummary expandIcon={<HiChevronDown />}>
          <Typography variant="subtitle1">
            {dict.shop.filterAvailability}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={inStock} onChange={handleStockChange} />
              }
              label={dict.shop.filterInStock}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {/* Trending */}
      <Accordion className={classes.accordion} disableGutters>
        <AccordionSummary expandIcon={<HiChevronDown />}>
          <Typography variant="subtitle1">
            {dict.shop.filterTrending}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={trending} onChange={handleTrendingChange} />
              }
              label={dict.shop.filterTrending}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <div className={classes.filtersPanelAction}>
        <Typography
          variant="subtitle1"
          onClick={() => {
            handleShowFilter();
            handleClearFilters();
          }}
        >
          {dict.shop.filterClose}
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={() => {
            applyFilters();
            handleShowFilter();
          }}
        >
          {dict.shop.filterApply}
        </Typography>
      </div>
    </div>
  );
}
