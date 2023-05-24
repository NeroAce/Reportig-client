import React, { useEffect, useState } from "react";
import MultiSelectDropdown from "../MultipleSelectDropDown";
import DatePick from "../DatePicker";
import SearchBar from "../SearchBar";
import api from "../../utlts/api";
import { Col, Row } from "react-bootstrap";

export default function FilterArea({
  to,
  from,
  setFilter,
  exportbtn,
  searchBtn,
  organisation,
  promo,
  status,
  dnd,
  subscription,
  campaign,
  city,
  platform,
  classes,
}) {
  const [validUpToDate, setValidUpToDate] = useState("");
  const [searchBarValue, setSearchBarValue] = useState("");
  const [matchData, setMatchData] = useState([]);

  //helper functions
  const setMultiFilterValue = (name, newList) => {
    const newValue = {};
    newValue[name] = newList;
    setFilter((prevValue) => ({
      ...prevValue,
      ...newValue,
    }));
  };

  useEffect(() => {
    api.get("/parents/nameEmail", {}).then((res) => setMatchData(res));
  }, []);

  return (
    <>
      <Row xl={6}>
        <Col>
          <label>
            From{" "}
            <DatePick
              date={from}
              setDate={(e) => {
                setFilter((prevValue) => ({
                  ...prevValue,
                  startDate: e,
                }));
              }}
            />
          </label>
        </Col>
        <Col>
          <label>
            To{" "}
            <DatePick
              date={to}
              setDate={(e) => {
                setFilter((prevValue) => ({
                  ...prevValue,
                  endDate: e,
                }));
              }}
            />
          </label>
        </Col>
        {/* <Col>
          <label>
            Valid Up To
            <DatePick date={validUpToDate} setDate={setValidUpToDate} />
          </label>
        </Col> */}

        {organisation && (
          <Col>
            <label>
              Organisation
              <MultiSelectDropdown
                data={organisation}
                onChange={(newList) =>
                  setMultiFilterValue("organisation", newList)
                }
              />
            </label>
          </Col>
        )}

        {promo && (
          <Col>
            <label>
              Promo
              <MultiSelectDropdown
                data={promo}
                onChange={(newList) => setMultiFilterValue("promo", newList)}
              />
            </label>
          </Col>
        )}

        {status && (
          <Col>
            <label>
              Status
              <MultiSelectDropdown
                data={status}
                onChange={(newList) => setMultiFilterValue("status", newList)}
              />
            </label>
          </Col>
        )}

        {dnd && (
          <Col>
            <label>
              DND
              <MultiSelectDropdown
                singleSelect={true}
                data={dnd}
                onChange={(newList) => setMultiFilterValue("dnd", newList)}
              />
            </label>
          </Col>
        )}

        {subscription && (
          <Col>
            <label>
              Subscription
              <MultiSelectDropdown
                data={subscription}
                onChange={(newList) =>
                  setMultiFilterValue("subscription", newList)
                }
              />
            </label>
          </Col>
        )}

        {classes && (
          <Col>
            <label>
              Classes
              <MultiSelectDropdown
                data={classes}
                onChange={(newList) => setMultiFilterValue("class", newList)}
              />
            </label>
          </Col>
        )}

        {platform && (
          <Col>
            <label>
              Platform
              <MultiSelectDropdown
                data={platform}
                onChange={(newList) => setMultiFilterValue("platform", newList)}
              />
            </label>
          </Col>
        )}

        {city && (
          <Col>
            <label>
              City
              <MultiSelectDropdown
                data={city}
                onChange={(newList) => setMultiFilterValue("city", newList)}
              />
            </label>
          </Col>
        )}

        {campaign && (
          <Col>
            <label>
              Campaign
              <MultiSelectDropdown
                data={campaign}
                onChange={(newList) => setMultiFilterValue("campaign", newList)}
              />
            </label>
          </Col>
        )}
      </Row>

      <SearchBar
        name="searchbar"
        value={searchBarValue}
        onChange={setSearchBarValue}
        searchbtnClick={() => {
          searchBtn(searchBarValue);
        }}
        export={true}
        exportbtnClick={() => exportbtn()}
        data={matchData}
      />
    </>
  );
}
