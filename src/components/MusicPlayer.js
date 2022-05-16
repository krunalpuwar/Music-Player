import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
// import TrackPlayer,{
//     Capability,
//     Event,
//     RepeatMode,
//     State,
//     useTrackPlayerEvents,
//     usePlaybackState,
//     useProgress,
// } from 'react-native-track-player';

const {width, height} = Dimensions.get('window');

// const setupPlayer = async() => {
//     await TrackPlayer.setupPlayer()
//     await TrackPlayer.add(songs)
// }

// const togglePlayback = async (playbackState) => {
//     const currentTrack = await TrackPlayer.getCurrentTrack()
//     if (currentTrack != null) {
//         if(playbackState === State.Paused)
//         await TrackPlayer.play() 
//     } else {
//         await TrackPlayer.pause()
//     }
// }


import songs from '../assets/data';

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [songIndex, setSongIndex] = useState(0);

  const songSlider= useRef(null)

  useEffect(() => {
    scrollX.addListener(({value}) => {
      console.log('scrollx', scrollX);
      const index = Math.round(value / width);
      setSongIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);


//   const skipToNext = () => {
//       songSlider.current.scrollToOffset({
//           offset:(songIndex + 1) * width,
//       })
//     }

//     const skipToBack = () => {
//         songSlider.current.scrollToOffset({
//             offset:(songIndex - 1) * width,
//         })
//       }

  const renderSongs = ({item, index}) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
    
        }}>
        <View style={styles.artworkWrapper}>
          <Image source={item.image} style={styles.artworkImg} />
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{width:width}}>
        <Animated.FlatList
          data={songs}
          ref={songSlider}
          renderItem={renderSongs}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
</View>

        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>

        <View>
          <Slider
            style={styles.slider}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#eed369"
            minimumTrackTintColor="#eed369"
            maximumTrackTintColor="#000000"
            onSlidingComplete={() => {}}
          />
          <View style={styles.progresslablecontainer}>
            <Text style={styles.progresslable}>0:00</Text>
            <Text style={styles.progresslable}>3:00</Text>
          </View>
        </View>

        <View style={styles.musicControlls}>
          <TouchableOpacity onPress={()=>skipToBack()}>
            <Ionicons name="play-skip-back-outline" size={30} color="#eed369" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-pause-circle" size={75} color="#eed369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>skipToNext()}>
            <Ionicons
              name="play-skip-forward-outline"
              size={30}
              color="#eed369"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
    shadowColor: '#ccc',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#eeeeee',
  },
  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#eeeeee',
  },
  slider: {
    width: 340,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progresslablecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
  },
  progresslable: {
    color: '#eeeeee',
  },
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
