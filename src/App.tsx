import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/Navbar/NavBar";
import GameGrid from "./components/games/GameGrid";
import GenreList from "./components/Genres/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenras";
import PlatformSelector from "./components/platform/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/Sorting/SortSelector";
import GameHeading from "./components/game-heading/GameHeading";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectSorting, setSelectSoting] = useState<string>("");
  const [searchText, setSearchtext] = useState<string>("");

  return (
    <Grid
      templateAreas={{
        base: `"nav " "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar onSearch={(searchText) => setSearchtext(searchText)} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={selectedGenre}
            onSelectGenre={(genre) => setSelectedGenre(genre)}
          />
        </GridItem>
      </Show>

      <GridItem area="main">
        <HStack padding={2}>
          <GameHeading
            selectedGenre={selectedGenre}
            selectedPlatform={selectPlatform}
          />
        </HStack>

        <HStack spacing={5} paddingLeft={2} marginBottom={5}>
          <PlatformSelector
            onSelectPlatform={(platfrom) => setSelectedPlatform(platfrom)}
            selectedPlatform={selectPlatform}
          />
          <SortSelector
            sortOrder={selectSorting}
            onSelectSortOrder={(sortOrder) => setSelectSoting(sortOrder)}
          />
        </HStack>
        <GameGrid
          selectedGenre={selectedGenre}
          selectedPlatform={selectPlatform}
          selectSortOrder={selectSorting}
          searchText={searchText}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
