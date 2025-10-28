import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonImg, IonSearchbar
} from '@ionic/react';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=bb2c28bae1b8ba9e9840ee853cd81939&language=en-US&page=1`)
      .then(res => setMovies(res.data.results))
      .catch(err => console.error(err));
  }, []);

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Popular Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar value={search} onIonChange={e => setSearch(e.detail.value!)} />
        <IonList>
          {filtered.map(movie => (
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
