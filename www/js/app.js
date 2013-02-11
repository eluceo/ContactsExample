function onDeviceReady() {
    var options = new ContactFindOptions();
    var fields = ['name', 'photos', 'phoneNumbers'];
    options.multiple = true;
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts) {
    var contactList = jQuery('#contact-list');

    contacts.sort(contactSort);

    jQuery.each(contacts, function (index, contact) {
        var listItem = jQuery('<li></li>');

        // ContactWrapper enthält den Namen, das Bild und die Telefonnummer
        var contactWrapper = listItem;

        var phoneNumber = null;
        if (null !== contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            phoneNumber = contact.phoneNumbers[0].value;
            contactWrapper = jQuery('<a></a>').attr('href', 'tel:' + phoneNumber);
            listItem.append(contactWrapper);
        }

        // Add name
        contactWrapper.append(jQuery('<h3></h3>').text(contact.name.formatted));

        // Add image, if available
        if (null !== contact.photos && contact.photos.length > 0) {
            var image = jQuery('<img />');
            image.attr('src', contact.photos[0].value)
            contactWrapper.append(image);
        }

        // Add Phonenumber to wrapper
        if (null !== phoneNumber) {
            contactWrapper.append(jQuery('<p></p>').text(phoneNumber));
        }

        // Add ListItem to list
        contactList.append(listItem);
    });

    // Refresh listview to enable jQuery Mobile functionality
    contactList.listview('refresh');
}

function onError(err) {
    alert("An error occured");
}

function contactSort(a,b) {
    var a_name = null !== a.name.familyName ? a.name.familyName : a.name.formatted,
        b_name = null !== b.name.familyName ? b.name.familyName : b.name.formatted

    if (a_name != b_name) {
        a_name = a.name.formatted;
        b_name = b.name.formatted;
    }

    return a_name > b_name ? 1 : -1;
}

document.addEventListener("deviceready", onDeviceReady, false);
