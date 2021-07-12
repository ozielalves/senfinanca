import { Grid } from "@material-ui/core";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import {TextField} from "../../../components/Form";
import { useTransactionFilters } from "../../../hooks/useTransactionFilters";
import { Filters } from "../../../models/Filter";
import SearchIcon from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import { SearchBarWrapper } from "./styles";
import { useCallback } from "react";
import { defaultFilterValue } from "../../../services/constants";

function SearchBar() {
  const formRef = useRef<FormHandles>(null);
  const [keyword, setKeyword] = useState(defaultFilterValue);
  const { filterBy, filters } = useTransactionFilters();

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const { keyword } = data as any;
    let newFilters: Filters = {
      keyword,
      type: filters.type,
      category: filters.category,
    };
    filterBy(newFilters);
  };

  const handleResetFilter = () => {
    setKeyword(defaultFilterValue);
    let newFilters: Filters = {
      keyword: defaultFilterValue,
      type: filters.type,
      category: filters.category,
    };
    filterBy(newFilters);
  };

  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(target.value);
    },
    []
  );
  return (
    <Grid item xs={12} md={8} lg={8}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SearchBarWrapper container direction="row" alignItems="center">
          <TextField
            name="keyword"
            placeholder="Buscar por título..."
            value={keyword}
            onChange={handleChange}
          />
          {filters.keyword !== defaultFilterValue && (
            <button className="reset" onClick={handleResetFilter}>
              <Close />
            </button>
          )}
          <button type="submit" className="search">
            <SearchIcon />
          </button>
        </SearchBarWrapper>
      </Form>
    </Grid>
  );
}

export default SearchBar;
