import React from 'react';
import {
  Container, Header, Title, Body, Content, List,
} from 'native-base';
import PropTypes from 'prop-types';

import BillTypeItemList from '../BillTypeItemList';
import Button from '../Button';
// import Container from '../Container';
import { THEME } from '../../constants';

function ModalContentBillTypes(props) {
  return (
    <Container style={{ backgroundColor: THEME.BACKGROUND }}>
      <Header style={{ backgroundColor: THEME.PRIMARY }}>
        <Body>
          <Title style={{ marginLeft: 10 }}>Selecione um tipo de conta:</Title>
        </Body>
      </Header>
      <Content>
        <List>
          {props.billTypes.map((billType, i) => (
            <BillTypeItemList
              key={i}
              billType={billType}
              onPress={props.onPress}
            />
          ))}
        </List>

        <Content padder>
          <Button padding cancel text="Fechar" onPress={props.hideModal} />
        </Content>
      </Content>
    </Container>
  );
}

ModalContentBillTypes.propTypes = {
  hideModal: PropTypes.func.isRequired,
  billTypes: PropTypes.array.isRequired,
  onPress: PropTypes.func,
};

ModalContentBillTypes.defaultProps = {
  onPress: () => {},
};

export default ModalContentBillTypes;
