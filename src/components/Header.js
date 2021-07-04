import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
    const onClick = () => {
        console.log('Click')
    }
    
    return (
         //add className to align side by side 
        <header className='header'>
            <h1>{title}</h1>
            <Button color='green' text='Add' onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}


Header.propTypes = {
    title: PropTypes.string.isRequired,
}
// optional CSS in JS
const headingStyle = {
    color: 'red', 
    backgroundColor: 'black'
}

export default Header
