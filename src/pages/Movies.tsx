import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonImg
} from '@ionic/react';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1`)
      .then(res => setMovies(res.data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Popular Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {movies.map(movie => (
            <IonItem key={movie.id}>
              <IonImg src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
              <IonLabel className="ion-padding">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Movies;
