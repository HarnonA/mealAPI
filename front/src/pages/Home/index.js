import { connect } from 'react-redux'

import Table from '../Table/index'
import NotAuth from '../NotAuth/index';


function Home(props) {
  return (
    <>
      {props.name ?
        <div>
          <Table />
        </div>
        : <NotAuth />

      }

    </>
  );
}

// export default Home;
const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name
  }
}

export default connect(mapStateToProps, null)(Home);


