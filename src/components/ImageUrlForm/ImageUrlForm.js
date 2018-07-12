import React from 'react';
import './ImageUrlForm.css';

const ImageUrlForm = ({ onInputChange, onSubmit }) => {
	return (
		<div>
			<p className = 'f3'>
				{'This brain will detect faces from images. Give it a try.'}
			</p>
			<div className = 'center'>
				<div className = 'center form pa4 br3 shadow-5'>
					<input className = 'f4 pa2 w-70 center' type = 'text' onChange = {onInputChange}/>
					<button 
						onClick = {onSubmit}
						className = 'w-30 f4 grow link ph3 pv2 dib white bg-light-purple' >{'DETECT'}</button>
				</div>
			</div>
		</div>
	);
}

export default ImageUrlForm;