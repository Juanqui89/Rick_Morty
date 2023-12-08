/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Characters {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

const App = () => {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      const result = response.data.results;
      setCharacters(result);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevClick = async () => {
    try {
      if (currentPage > 1) {
        const newPage = currentPage - 1;
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        const result = response.data.results;
        setCharacters(result);
        setCurrentPage(newPage);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleNextClick = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${nextPage}`
      );
      const newCharacters = response.data.results;

      setCharacters((prevCharacters) => [...prevCharacters, ...newCharacters]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">Rick & Morty</h1>
          <section className="content">
            {characters.map((item) => (
              <Card key={item.id}>
                <Card.Img
                  src={item.image}
                  alt={`${item.id}`}
                  className="character-img"
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.location.name}
                    <p>The origin of this character is: {item.origin.name}</p>
                    <p>The specie of this character is: {item.species}</p>
                    <p>The character status is: {item.status}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </section>
        </Col>

        <div className="directions">
          <button className="prev" onClick={handlePrevClick}>
            Prev
          </button>
          <span>{currentPage}</span>
          <button className="next" onClick={handleNextClick}>
            Next
          </button>
          <a href="#" onClick={scrollToTop}>
            <i className="bi bi-arrow-up-circle-fill"></i>
          </a>
        </div>
      </Row>
    </Container>
  );
};
export default App;
