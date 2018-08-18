import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import QualifyContainer from './QualifyContainer.jsx';
import Qualify from './Qualify.jsx';
import Outcomes from './Outcomes.jsx';


const Financial = props => {

  const styles = {
    card: {
      borderRadius: 0,
      padding: '5px'
    },
    qualify: {
      margin: '30px 0'
    }
  };

  return (
    <div>
      <Card style={styles.card}>
        <CardContent>
          <Typography gutterBottom variant='title'>Financial Information</Typography>
          <Typography gutterBottom variant='body1'>{props.service.financial_info}</Typography>
          <div style={styles.qualify}>
            <QualifyContainer service={props.service}/>
          </div>
          <Outcomes service={props.service} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Financial;
