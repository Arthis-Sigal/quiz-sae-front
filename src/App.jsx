import Quiz from "./Quiz"
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { jsQuizz } from "./constants";
import { Box } from '@mui/material';

function App() {

  return (
    <Box>
      <Quiz questions={jsQuizz}/>
    </Box>


  )
}

export default App
