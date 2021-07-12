import { ClickAwayListener, Grid } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import FilterListIcon from "@material-ui/icons/FilterList";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import Button from "../../../components/Button";
import {Select} from "../../../components/Form";
import { useTransactionFilters } from "../../../hooks/useTransactionFilters";
import { Filters } from "../../../models/Filter";
import {
  defaultFilterValue,
  transactionCategories,
  transactionTypes,
} from "../../../services/constants";
import { ClearButton, CloseButton, FiltersContainer } from "./styles";

function FiltersDropdown() {
  const { filterBy, filters } = useTransactionFilters();
  const formRef = useRef<FormHandles>(null);
  const [openFiltersModal, setOpenFiltersModal] = useState(false);
  const [selectedType, setSelectedType] = useState(defaultFilterValue);
  const [selectedCategory, setSelectedCategory] = useState(defaultFilterValue);

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    const { type, category } = data as any;
    let newFilters: Filters = { keyword: filters.keyword, type, category };
    filterBy(newFilters);
  };

  const handleClickAway = () => {
    setOpenFiltersModal(false);
  };

  const toggleModalOpen = () => {
    setOpenFiltersModal((prev) => !prev);
  };

  const handleTypeChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(target.value);
  };

  const handleCategoryChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(target.value);
  };

  const handleResetFilters = () => {
    setSelectedCategory(defaultFilterValue);
    setSelectedType(defaultFilterValue);
    let newFilters: Filters = {
      keyword: filters.keyword,
      type: defaultFilterValue,
      category: defaultFilterValue,
    };
    filterBy(newFilters);
  };
  return (
    <>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <FiltersContainer>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            color="secondary"
            onClick={toggleModalOpen}
          >
            Filtros
          </Button>
          {openFiltersModal ? (
            <div className="dropdown">
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <ClearButton onClick={handleResetFilters}>
                          Limpar
                        </ClearButton>
                      </Grid>
                      <Grid item>
                        <CloseButton
                          onClick={toggleModalOpen}
                          color="primary"
                          aria-label="delete client"
                        >
                          <CloseIcon />
                        </CloseButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Select
                          name="type"
                          placeholder="Tipo"
                          value={selectedType}
                          onChange={handleTypeChange}
                        >
                          <option value={defaultFilterValue}>Selecione o tipo</option>
                          {transactionTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item>
                        <Select
                          name="category"
                          placeholder="Categoria"
                          value={selectedCategory}
                          onChange={handleCategoryChange}
                        >
                          <option value={defaultFilterValue}>Selecione a categoria</option>
                          {transactionCategories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" type="submit">
                      Aplicar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </div>
          ) : null}
        </FiltersContainer>
      </ClickAwayListener>
    </>
  );
}

export default FiltersDropdown;
