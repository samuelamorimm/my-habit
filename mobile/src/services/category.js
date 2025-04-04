import Icon from 'react-native-vector-icons/Ionicons';

export default function iconCategory(c, color){
  if (c === 'EXERCISE') {
    return <Icon name='barbell' color={color} size={25}/>
  } else if (c === 'HEALTH') {
    return <Icon name='heart' color={color} size={25}/>
  }  else if (c === 'LEARNING') {
    return <Icon name='book' color={color} size={25}/>
  }  else if (c === 'WORK') {
    return <Icon name='briefcase' color={color} size={25}/>
  } else {
    return <Icon name='game-controller' color={color} size={25}/>
  }
}