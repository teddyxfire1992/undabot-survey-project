import PropTypes from 'prop-types';
import { FormControlWrapper, StyledInput } from './styled';
import { FormLabel } from '../form-label';
import { ErrorMessage } from '../error-message';

export const Input = ({ label, errors, isRequired, isError, onChange }) => {
	return (
		<FormControlWrapper
			error={isError}
			required={isRequired}
			onChange={onChange}
		>
			<FormLabel>{label}</FormLabel>
			<StyledInput />
			{errors &&
				errors.map((error, i) => (
					<ErrorMessage key={error + i}>{error}</ErrorMessage>
				))}
		</FormControlWrapper>
	);
};

Input.defaultProps = {
	errors: [],
	isRequired: false,
	isError: false,
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.array,
	isRequired: PropTypes.bool,
	isError: PropTypes.bool,
};
