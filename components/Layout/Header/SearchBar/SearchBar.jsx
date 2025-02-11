// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchSearchResultsAPI } from "@/actions/products.actions.js";
import FormatLink from "@/helpers/FormatLink";
import CapitalizeText from "@/helpers/CapitalizeText";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "./styles.js";

// ** MUI Imports
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";

// ** Third Party Imports
import { AiOutlineSearch } from "react-icons/ai";
import { MdClose } from "react-icons/md";

export default function SearchBar({ dict }) {
  const { classes } = useStyles();
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // To close search bar on url change
  useEffect(() => {
    setSearch(false);
  }, [pathname]);

  //To fetch products from database
  const handleInputChange = async (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      setLoading(true);

      try {
        const results = await fetchSearchResultsAPI(term);

        setSearchResults(results);
      } catch (error) {
        ToastStatus("Error", "Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  //To redirect to product page
  const handleSelect = (event, option) => {
    if (option.name) {
      router.push(`/p/${FormatLink(option.name)}`);
    }
  };

  //To redirect to search page
  const handleGoToSearch = (keypress, search) => {
    if (keypress.key === "Enter" || (search && searchTerm.length > 0)) {
      router.push(`/search/?query=${searchTerm}`);
    }
  };

  return (
    <>
      <Toaster />
      {search && (
        <div className={classes.container}>
          <div className={classes.searchBar}>
            <Autocomplete
              options={searchResults}
              loading={loading}
              disableClearable
              getOptionLabel={(option) => CapitalizeText(option.name)}
              popupIcon={false}
              noOptionsText={dict.header.searchNoOptionsText + "..."}
              ListboxProps={{
                className: classes.dropdownList,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  onChange={(event) => handleInputChange(event.target.value)}
                  placeholder={dict.header.searchBarText + "..."}
                  InputProps={{
                    ...params.InputProps,
                    onKeyPress: (event) => handleGoToSearch(event, false),
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineSearch
                          fontSize={"1em"}
                          onClick={(event) => handleGoToSearch(false, event)}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <MdClose
                          fontSize={"1em"}
                          onClick={() => setSearch(!search)}
                          style={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              onChange={handleSelect}
              classes={{
                paper: classes.dropdown,
              }}
            />
          </div>
        </div>
      )}
      {!search && (
        <AiOutlineSearch
          fontSize={"1.5em"}
          onClick={() => setSearch(!search)}
        />
      )}
    </>
  );
}
