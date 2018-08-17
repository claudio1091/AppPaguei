import React from 'react';
import {
  Header, Title, Body, Content, List,
} from 'native-base';
import PropTypes from 'prop-types';

import BillTypeItemList from '../BillTypeItemList';
import Button from '../Button';
import Container from '../Container';

function ModalContentBillTypes(props) {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Selecione um tipo de conta:</Title>
        </Body>
      </Header>
      <Content padder>
        <List>
          {props.billTypes.map((billType, i) => (
            <BillTypeItemList
              key={i}
              billType={billType}
              onPress={props.onPress}
            />
          ))}
        </List>

        <Button padding cancel text="Fechar" onPress={props.hideModal} />
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
