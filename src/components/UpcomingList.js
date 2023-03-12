import {
  Alert,
  Button,
  Input,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updating } from "../features/apiState/apiStateSlice";
import { useGetListQuery } from "../features/api/apiSlice";

const UpcomingList = () => {
  const initialInputs = {
    launchName: "",
    rocketName: "",
    launchAgency: "",
    missionName: "",
  };

  const [inputs, setInputs] = useState(initialInputs);

  const dispatch = useDispatch();

  const apiState = useSelector((store) => store.apiState);

  const { data: dat, url } = apiState;

  const { isLoading, isError, data } = useGetListQuery(url);

  if (isLoading) {
    return (
      <div className="list-loading">
        <Spinner size="xl" thickness="6px" color="#229ED9" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert colorScheme="red" color="red">
        Connection Error
      </Alert>
    );
  }

  console.log(dat);

  const handleSearch = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = (e) => {
    dispatch(
      updating({
        data,
        next: true,
      })
    );
  };

  const handlePrevious = (e) => {
    dispatch(
      updating({
        data,
        next: false,
      })
    );
  };

  return (
    <>
      <Table variant="striped" colorScheme="messenger" size="sm">
        <Thead>
          <Tr>
            <Th>Launch Name</Th>
            <Th>Rocket Name</Th>
            <Th>Launch Agency</Th>
            <Th>Mission Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.results.map((el) => {
            const mission = el.mission ? el.mission.name : "-";
            return (
              el.name.toLowerCase().includes(inputs.launchName.toLowerCase()) &&
              el.rocket.configuration.name
                .toLowerCase()
                .includes(inputs.rocketName.toLowerCase()) &&
              el.pad.name
                .toLowerCase()
                .includes(inputs.launchAgency.toLowerCase()) &&
              mission
                .toLowerCase()
                .includes(inputs.missionName.toLowerCase()) && (
                <Tr key={el.id}>
                  <Td>{el.name}</Td>
                  <Td>{el.rocket.configuration.name}</Td>
                  <Td>{el.pad.name}</Td>
                  <Td>{mission}</Td>
                </Tr>
              )
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>
              <Input
                name="launchName"
                value={inputs.launchName}
                placeholder="Search Launch"
                onChange={handleSearch}
              />
            </Td>
            <Td>
              <Input
                name="rocketName"
                value={inputs.rocketName}
                placeholder="Search Rocket"
                onChange={handleSearch}
              />
            </Td>
            <Td>
              <Input
                name="launchAgency"
                value={inputs.launchAgency}
                placeholder="Search Agency"
                onChange={handleSearch}
              />
            </Td>
            <Td>
              <Input
                name="missionName"
                value={inputs.missionName}
                placeholder="Search Mission"
                onChange={handleSearch}
              />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
      <div className="list-buttons">
        {(dat || data.previous) && (
          <Button colorScheme="telegram" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {data.next && (
          <Button colorScheme="telegram" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </>
  );
};

export default UpcomingList;
