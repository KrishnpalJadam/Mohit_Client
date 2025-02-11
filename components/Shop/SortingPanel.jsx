// ** Next, React And Locals Imports
import { useState } from "react";
import useStyles from "./styles.js";
import theme from "@/components/Theme/theme.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Skeleton from "@mui/material/Skeleton";

// ** Third Party Imports
import { BsFilterCircle } from "react-icons/bs";

export default function SortingPanel({
  dict,
  handleSortByChange,
  handleShowFilter,
  totalCount,
}) {
  const { classes } = useStyles();

  // Filters State
  const [sortingFilter, setSortingFilter] = useState(dict.shop.sortNewest);

  // Sorting
  const sortBy = [
    dict.shop.sortNewest,
    dict.shop.sortPriceLowToHigh,
    dict.shop.sortPriceHighToLow,
  ];

  const handleSortbyFilter = (e) => {
    setSortingFilter(e.target.value);

    const convertedString = e.target.value
      .replace(/: /g, "") // Remove colon and space
      .replace(/ /g, "") // Remove spaces
      .replace(/([a-z])([A-Z])/g, "$1$2"); // Convert to camel case

    handleSortByChange(convertedString);
  };

  return (
    <div className={classes.sortingCtn}>
      <Typography variant="subtitle1" sx={{ width: "100%" }}>
        {totalCount ? (
          <>{totalCount + " " + dict.shop.itemsFound}</>
        ) : (
          <Skeleton
            animation="wave"
            variant="text"
            sx={{
              bgcolor: `${theme.palette.primary.light}25`,
              maxWidth: "150px",
            }}
          />
        )}
      </Typography>
      <div>
        <FormControl className={classes.sortBy} size="small">
          <Select
            displayEmpty
            value={sortingFilter}
            onChange={handleSortbyFilter}
            renderValue={(selected) => (
              <span>
                {dict.shop.sortText}:{" "}
                <span className={classes.sortText}>{selected}</span>
              </span>
            )}
          >
            {sortBy.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <BsFilterCircle
          className={classes.filterIcon}
          onClick={handleShowFilter}
        />
      </div>
    </div>
  );
}
