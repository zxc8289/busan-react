import axios from "axios";
import HeadLayout from "components/layouts/HeadLayout";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  // https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?
  // 서비스키 : serviceKey=L4O6Jd5locofQV0Sa674EwMQ4GyHi380DNlzkWVMQLw8O2LvzNMvBKe1RxTj4jssgmQKPrDvinJFtSOIs9KmbA%3D%3D
  // 페이지넘버 : & pageNo=1
  // 가져올 개수 :  & numOfRows=10
  // 타입 : & resultType=json
  // QueryString
  const { search } = useLocation();
  // const queryString = useMemo(() => new URLSearchParams(search), [search]); //

  const [attrs, setAttrs] = useState([]);

  const navigate = useNavigate();

  const getPageNo = useMemo(() => {
    const queryString = new URLSearchParams(search);

    let pageNo = "1";
    if (
      queryString.get("pageNo") != null &&
      !isNaN(queryString.get("pageNo"))
    ) {
      pageNo = queryString.get("pageNo");
    }

    return pageNo;
  }, [search]);

  const prevButton = () => {};

  const getAttrs = () => {
    axios
      .get(
        `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=AI1uTxc0pnB2qtbcM9Tt%2B6AAxosPPjJ8JF9%2Fg6vWYqU4toH5dIvYSHWedSFOfo3B%2Ft7eEDnzVbvBE38mKYyVHw%3D%3D&pageNo=${getPageNo}&numOfRows=10&resultType=json`
      )
      .then((response) => {
        console.log(response.data.getAttractionKr.item);
        setAttrs(response.data.getAttractionKr.item);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    console.log(getPageNo);

    getAttrs();
  }, [getPageNo]);

  return (
    <HeadLayout>
      <div>
        <div>메인페이지</div>
        <Container>
          <Row>
            <Col>
              <Button
                className="me-3"
                variant="primary"
                onClick={() => navigate(`/?pageNo=${parseInt(getPageNo) - 1}`)}
              >
                prev
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(`/?pageNo=${parseInt(getPageNo) + 1}`)}
              >
                next
              </Button>
            </Col>
          </Row>
          <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
            {attrs.map((value, index) => {
              return (
                <Col key={index}>
                  <Card className="mb-5">
                    <Card.Img variant="top" src={value.MAIN_IMG_THUMB} />
                    <Card.Body>
                      <Card.Title>{value.MAIN_TITLE}</Card.Title>
                      <Card.Text
                        style={{ height: "100px", overflow: "hidden" }}
                      >
                        {value.ITEMCNTNTS}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/counter/${value.UC_SEQ}`)}
                      >
                        자세히 보기
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <button onClick={() => navigate("/counter")}>카운터로 이동</button>
      </div>
    </HeadLayout>
  );
};

export default Main;
