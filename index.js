let net;

async function app() {
	// Init
	$('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Image Selection Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('imagePreview').src = e.target.result;
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageSelection").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

	// Load the model
	console.log('Loading mobilenet..');
    $('.loader').show();
	net = await mobilenet.load();
	console.log('Successfully loaded model');
    $('.loader').hide();

    // Prediction
	$('#btn-predict').click(async function () {
		$(this).hide();
		$('.loader').show();

		// Perform inference
		const imageElement = document.getElementById('imagePreview');
		const prediction = await net.classify(imageElement, 1);

		// Show results
		$('.loader').hide();
		console.log(prediction);
		$('#result').text(" Predicted class: " + prediction[0]['className'] + "\nProbability: " + prediction[0]['probability']);
		$('#result').show();
    });
}

app();