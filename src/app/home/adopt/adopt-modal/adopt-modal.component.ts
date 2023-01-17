import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/auth/user/user.service';
import { Geolocation } from '@capacitor/geolocation'
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

@Component({
  selector: 'app-adopt-modal',
  templateUrl: './adopt-modal.component.html',
  styleUrls: ['./adopt-modal.component.scss'],
})
export class AdoptModalComponent implements OnInit {
  public ionicForm: FormGroup;
  breeds: string[]
  hasBreed = false

  dogBreeds: string[] = [
    "Affenpinscher",
    "Afghan Hound",
    "Aidi",
    "Airedale Terrier",
    "Akbash Dog",
    "Akita",
    "Alano Español",
    "Alaskan Klee Kai",
    "Alaskan Malamute",
    "Alpine Dachsbracke",
    "Alpine Spaniel",
    "American Bulldog",
    "American Cocker Spaniel",
    "American Eskimo Dog",
    "American Foxhound",
    "American Hairless Terrier",
    "American Pit Bull Terrier",
    "American Staffordshire Terrier",
    "American Water Spaniel",
    "Anglo-Français de Petite Vénerie",
    "Appenzeller Sennenhund",
    "Ariege Pointer",
    "Ariegeois",
    "Armant",
    "Armenian Gampr dog",
    "Artois Hound",
    "Australian Cattle Dog",
    "Australian Kelpie",
    "Australian Shepherd",
    "Australian Silky Terrier",
    "Australian Stumpy Tail Cattle Dog",
    "Australian Terrier",
    "Azawakh",
    "Bakharwal Dog",
    "Barbet",
    "Basenji",
    "Basque Shepherd Dog",
    "Basset Artésien Normand",
    "Basset Bleu de Gascogne",
    "Basset Fauve de Bretagne",
    "Basset Hound",
    "Bavarian Mountain Hound",
    "Beagle",
    "Beagle-Harrier",
    "Bearded Collie",
    "Beauceron",
    "Bedlington Terrier",
    "Belgian Shepherd Dog (Groenendael)",
    "Belgian Shepherd Dog (Laekenois)",
    "Belgian Shepherd Dog (Malinois)",
    "Bergamasco Shepherd",
    "Berger Blanc Suisse",
    "Berger Picard",
    "Berner Laufhund",
    "Bernese Mountain Dog",
    "Billy",
    "Black and Tan Coonhound",
    "Black and Tan Virginia Foxhound",
    "Black Norwegian Elkhound",
    "Black Russian Terrier",
    "Bloodhound",
    "Blue Lacy",
    "Blue Paul Terrier",
    "Boerboel",
    "Bohemian Shepherd",
    "Bolognese",
    "Border Collie",
    "Border Terrier",
    "Borzoi",
    "Boston Terrier",
    "Bouvier des Ardennes",
    "Bouvier des Flandres",
    "Boxer",
    "Boykin Spaniel",
    "Bracco Italiano",
    "Braque d'Auvergne",
    "Braque du Bourbonnais",
    "Braque du Puy",
    "Braque Francais",
    "Braque Saint-Germain",
    "Brazilian Terrier",
    "Briard",
    "Briquet Griffon Vendéen",
    "Brittany",
    "Broholmer",
    "Bruno Jura Hound",
    "Bucovina Shepherd Dog",
    "Bull and Terrier",
    "Bull Terrier (Miniature)",
    "Bull Terrier",
    "Bulldog",
    "Bullenbeisser",
    "Bullmastiff",
    "Bully Kutta",
    "Burgos Pointer",
    "Cairn Terrier",
    "Canaan Dog",
    "Canadian Eskimo Dog",
    "Cane Corso",
    "Cardigan Welsh Corgi",
    "Carolina Dog",
    "Carpathian Shepherd Dog",
    "Catahoula Cur",
    "Catalan Sheepdog",
    "Caucasian Shepherd Dog",
    "Cavalier King Charles Spaniel",
    "Central Asian Shepherd Dog",
    "Cesky Fousek",
    "Cesky Terrier",
    "Chesapeake Bay Retriever",
    "Chien Français Blanc et Noir",
    "Chien Français Blanc et Orange",
    "Chien Français Tricolore",
    "Chien-gris",
    "Chihuahua",
    "Chilean Fox Terrier",
    "Chinese Chongqing Dog",
    "Chinese Crested Dog",
    "Chinese Imperial Dog",
    "Chinook",
    "Chippiparai",
    "Chow Chow",
    "Cierny Sery",
    "Cimarrón Uruguayo",
    "Cirneco dell'Etna",
    "Clumber Spaniel",
    "Combai",
    "Cordoba Fighting Dog",
    "Coton de Tulear",
    "Cretan Hound",
    "Croatian Sheepdog",
    "Cumberland Sheepdog",
    "Curly Coated Retriever",
    "Cursinu",
    "Cão da Serra de Aires",
    "Cão de Castro Laboreiro",
    "Cão Fila de São Miguel",
    "Dachshund",
    "Dalmatian",
    "Dandie Dinmont Terrier",
    "Danish Swedish Farmdog",
    "Deutsche Bracke",
    "Doberman Pinscher",
    "Dogo Argentino",
    "Dogo Cubano",
    "Dogue de Bordeaux",
    "Drentse Patrijshond",
    "Drever",
    "Dunker",
    "Dutch Shepherd Dog",
    "Dutch Smoushond",
    "East Siberian Laika",
    "East-European Shepherd",
    "Elo",
    "English Cocker Spaniel",
    "English Foxhound",
    "English Mastiff",
    "English Setter",
    "English Shepherd",
    "English Springer Spaniel",
    "English Toy Terrier (Black &amp; Tan)",
    "English Water Spaniel",
    "English White Terrier",
    "Entlebucher Mountain Dog",
    "Estonian Hound",
    "Estrela Mountain Dog",
    "Eurasier",
    "Field Spaniel",
    "Fila Brasileiro",
    "Finnish Hound",
    "Finnish Lapphund",
    "Finnish Spitz",
    "Flat-Coated Retriever",
    "Formosan Mountain Dog",
    "Fox Terrier (Smooth)",
    "French Bulldog",
    "French Spaniel",
    "Galgo Español",
    "Gascon Saintongeois",
    "German Longhaired Pointer",
    "German Pinscher",
    "German Shepherd",
    "German Shorthaired Pointer",
    "German Spaniel",
    "German Spitz",
    "German Wirehaired Pointer",
    "Giant Schnauzer",
    "Glen of Imaal Terrier",
    "Golden Retriever",
    "Gordon Setter",
    "Gran Mastín de Borínquen",
    "Grand Anglo-Français Blanc et Noir",
    "Grand Anglo-Français Blanc et Orange",
    "Grand Anglo-Français Tricolore",
    "Grand Basset Griffon Vendéen",
    "Grand Bleu de Gascogne",
    "Grand Griffon Vendéen",
    "Great Dane",
    "Great Pyrenees",
    "Greater Swiss Mountain Dog",
    "Greek Harehound",
    "Greenland Dog",
    "Greyhound",
    "Griffon Bleu de Gascogne",
    "Griffon Bruxellois",
    "Griffon Fauve de Bretagne",
    "Griffon Nivernais",
    "Hamiltonstövare",
    "Hanover Hound",
    "Hare Indian Dog",
    "Harrier",
    "Havanese",
    "Hawaiian Poi Dog",
    "Himalayan Sheepdog",
    "Hokkaido",
    "Hovawart",
    "Huntaway",
    "Hygenhund",
    "Ibizan Hound",
    "Icelandic Sheepdog",
    "Indian pariah dog",
    "Indian Spitz",
    "Irish Red and White Setter",
    "Irish Setter",
    "Irish Terrier",
    "Irish Water Spaniel",
    "Irish Wolfhound",
    "Istrian Coarse-haired Hound",
    "Istrian Shorthaired Hound",
    "Italian Greyhound",
    "Jack Russell Terrier",
    "Jagdterrier",
    "Jämthund",
    "Kai Ken",
    "Kaikadi",
    "Kanni",
    "Karelian Bear Dog",
    "Karst Shepherd",
    "Keeshond",
    "Kerry Beagle",
    "Kerry Blue Terrier",
    "King Charles Spaniel",
    "King Shepherd",
    "Kintamani",
    "Kishu",
    "Komondor",
    "Kooikerhondje",
    "Koolie",
    "Korean Jindo Dog",
    "Kromfohrländer",
    "Kumaon Mastiff",
    "Kurī",
    "Kuvasz",
    "Kyi-Leo",
    "Labrador Husky",
    "Labrador Retriever",
    "Lagotto Romagnolo",
    "Lakeland Terrier",
    "Lancashire Heeler",
    "Landseer",
    "Lapponian Herder",
    "Large Münsterländer",
    "Leonberger",
    "Lhasa Apso",
    "Lithuanian Hound",
    "Longhaired Whippet",
    "Löwchen",
    "Mahratta Greyhound",
    "Maltese",
    "Manchester Terrier",
    "Maremma Sheepdog",
    "McNab",
    "Mexican Hairless Dog",
    "Miniature American Shepherd",
    "Miniature Australian Shepherd",
    "Miniature Fox Terrier",
    "Miniature Pinscher",
    "Miniature Schnauzer",
    "Miniature Shar Pei",
    "Molossus",
    "Montenegrin Mountain Hound",
    "Moscow Watchdog",
    "Moscow Water Dog",
    "Mountain Cur",
    "Mucuchies",
    "Mudhol Hound",
    "Mudi",
    "Neapolitan Mastiff",
    "New Zealand Heading Dog",
    "Newfoundland",
    "Norfolk Spaniel",
    "Norfolk Terrier",
    "Norrbottenspets",
    "North Country Beagle",
    "Northern Inuit Dog",
    "Norwegian Buhund",
    "Norwegian Elkhound",
    "Norwegian Lundehund",
    "Norwich Terrier",
    "Old Croatian Sighthound",
    "Old Danish Pointer",
    "Old English Sheepdog",
    "Old English Terrier",
    "Old German Shepherd Dog",
    "Olde English Bulldogge",
    "Otterhound",
    "Pachon Navarro",
    "Paisley Terrier",
    "Pandikona",
    "Papillon",
    "Parson Russell Terrier",
    "Patterdale Terrier",
    "Pekingese",
    "Pembroke Welsh Corgi",
    "Perro de Presa Canario",
    "Perro de Presa Mallorquin",
    "Peruvian Hairless Dog",
    "Petit Basset Griffon Vendéen",
    "Petit Bleu de Gascogne",
    "Phalène",
    "Pharaoh Hound",
    "Phu Quoc ridgeback dog",
    "Picardy Spaniel",
    "Plott Hound",
    "Podenco Canario",
    "Pointer (dog breed)",
    "Polish Greyhound",
    "Polish Hound",
    "Polish Hunting Dog",
    "Polish Lowland Sheepdog",
    "Polish Tatra Sheepdog",
    "Pomeranian",
    "Pont-Audemer Spaniel",
    "Poodle",
    "Porcelaine",
    "Portuguese Podengo",
    "Portuguese Pointer",
    "Portuguese Water Dog",
    "Posavac Hound",
    "Pražský Krysařík",
    "Pudelpointer",
    "Pug",
    "Puli",
    "Pumi",
    "Pungsan Dog",
    "Pyrenean Mastiff",
    "Pyrenean Shepherd",
    "Rafeiro do Alentejo",
    "Rajapalayam",
    "Rampur Greyhound",
    "Rastreador Brasileiro",
    "Rat Terrier",
    "Ratonero Bodeguero Andaluz",
    "Redbone Coonhound",
    "Rhodesian Ridgeback",
    "Rottweiler",
    "Rough Collie",
    "Russell Terrier",
    "Russian Spaniel",
    "Russian tracker",
    "Russo-European Laika",
    "Sabueso Español",
    "Saint-Usuge Spaniel",
    "Sakhalin Husky",
    "Saluki",
    "Samoyed",
    "Sapsali",
    "Schapendoes",
    "Schillerstövare",
    "Schipperke",
    "Schweizer Laufhund",
    "Schweizerischer Niederlaufhund",
    "Scotch Collie",
    "Scottish Deerhound",
    "Scottish Terrier",
    "Sealyham Terrier",
    "Segugio Italiano",
    "Seppala Siberian Sleddog",
    "Serbian Hound",
    "Serbian Tricolour Hound",
    "Shar Pei",
    "Shetland Sheepdog",
    "Shiba Inu",
    "Shih Tzu",
    "Shikoku",
    "Shiloh Shepherd Dog",
    "Siberian Husky",
    "Silken Windhound",
    "Sinhala Hound",
    "Skye Terrier",
    "Sloughi",
    "Slovak Cuvac",
    "Slovakian Rough-haired Pointer",
    "Small Greek Domestic Dog",
    "Small Münsterländer",
    "Smooth Collie",
    "South Russian Ovcharka",
    "Southern Hound",
    "Spanish Mastiff",
    "Spanish Water Dog",
    "Spinone Italiano",
    "Sporting Lucas Terrier",
    "St. Bernard",
    "St. John's water dog",
    "Stabyhoun",
    "Staffordshire Bull Terrier",
    "Standard Schnauzer",
    "Stephens Cur",
    "Styrian Coarse-haired Hound",
    "Sussex Spaniel",
    "Swedish Lapphund",
    "Swedish Vallhund",
    "Tahltan Bear Dog",
    "Taigan",
    "Talbot",
    "Tamaskan Dog",
    "Teddy Roosevelt Terrier",
    "Telomian",
    "Tenterfield Terrier",
    "Thai Bangkaew Dog",
    "Thai Ridgeback",
    "Tibetan Mastiff",
    "Tibetan Spaniel",
    "Tibetan Terrier",
    "Tornjak",
    "Tosa",
    "Toy Bulldog",
    "Toy Fox Terrier",
    "Toy Manchester Terrier",
    "Toy Trawler Spaniel",
    "Transylvanian Hound",
    "Treeing Cur",
    "Treeing Walker Coonhound",
    "Trigg Hound",
    "Tweed Water Spaniel",
    "Tyrolean Hound",
    "Vizsla",
    "Volpino Italiano",
    "Weimaraner",
    "Welsh Sheepdog",
    "Welsh Springer Spaniel",
    "Welsh Terrier",
    "West Highland White Terrier",
    "West Siberian Laika",
    "Westphalian Dachsbracke",
    "Wetterhoun",
    "Whippet",
    "White Shepherd",
    "Wire Fox Terrier",
    "Wirehaired Pointing Griffon",
    "Wirehaired Vizsla",
    "Yorkshire Terrier",
    "Šarplaninac"
  ]
  catBreeds: string[] = [
    'Abyssinian',
    'American Bobtail',
    'American Curl',
    'American Shorthair',
    'American Wirehair',
    'Balinese-Javanese',
    'Bengal',
    'British Shorthair',
    'Comun',
    'Himalayan',
    'Maine Coon',
    'Munchkin',
    'Norwegian',
    'Ocicat',
    'Persian',
    'Russian Blue',
    'Scottish',
    'Siamese',
    'Siberian',
    'Somali',
    'Sphynx',
    'Turkish Angora'
  ]
  pigBreeds: string[] = [
    'Yorkshire',
    'Duroc',
    'Hampshire',
    'Landrace',
    'Vietnamese'
  ]
  birdBreeds: string[] = [
    'African Grey Parrot',
    'Amazon Parrot',
    'Blue-Gold Macaw',
    'Budgie (Parakeet)',    
    'Canary',
    'Cockatiel',
    'Cockatoo',
    'Dove',
    'Fischers Lovebird',
    'Green-Winged Macaw',
    'Lovebird',
    'Macaw',
    'Moluccan Cockatoo',
    'Owl Finch',
    'Song Canary',
    'Umbrella Cockatoo'
  ]
  hamsterBreeds: string[] = [
    'Chinese Hamster',
    'Roborovski Hamsters',
    'Syrian Hamster',
    'Campbells Hamster',
    'Winter White Hamster'
  ]
  rabbitBreeds: string[] = [
    'American Rabbits',
    'American Chinchilla',
    'American Fuzzy Lop',
    'American Sable',
    'Argente Brun',
    'Belgian Hare',
    'Beveren',
    'Blanc de Hotot',
    'Britannia Petite',
    'Californian',
    'Champagne dArgent',
    'Checkered Giant Rabbits'
  ]
  turtleBreeds: string[] = [
    'Red-Eared Slider',
    'African Sideneck Turtle',
    'Eastern Box Turtle',
    'Western Painted Turtle',
    'Mississippi Map Turtle',
    'Common Musk Turtle',
    'Spotted Turtle',
    'Yellow-Bellied Slider'
  ]

  validation_messages = {
    'buddyName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'buddyType': [
      { type: 'required', message: 'Type is required.' }
    ],
    'buddyGender': [
      { type: 'required', message: 'Gender is required.' }
    ],
    'buddyAge': [
      { type: 'required', message: 'Age is required.' }
    ], 
    'buddyBreed': [
      { type: 'required', message: 'Breed is required.' }
    ],
    'buddyBday': [
      { type: 'required', message: 'Birthday is required.' }
    ]
  }
  data = [
    {
      img: "slide-1.jpg", 
      title: "know always where your buddy is!", 
      description: "Don't worry about your buddy, <b>always</b> be aware of where he is."
    }, 
    {
      img: "slide-2.jpg", 
      title: "know always where your buddy is!", 
      description: "Track every step. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }, 
    {
      img: "slide-1.jpg", 
      title: "know always where your buddy is!", 
      description: "Donec eget est ultrices, tincidunt orci in, venenatis magna. Suspendisse mattis congue tempor."
    }
  ]

  images = []
  imageUrl = []
  percentage
  downloadURL: Observable<string>;
  user = {} as User;
  geoAddress;

  constructor(private userService: UserService, private modalCtrl: ModalController, private formBuilder: FormBuilder, private afs: AngularFirestore, 
    private storage: AngularFireStorage, private nativeGeocoder: NativeGeocoder) { }

    options: NativeGeocoderOptions = {
      useLocale : true,
      maxResults : 5
    }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      attributes: this.formBuilder.array([ this.initAttributesFields()]) 
    })
  }
  
  close() {
    this.modalCtrl.dismiss();
  }

  initAttributesFields() : FormGroup {
    return this.formBuilder.group({
      buddyName: ['', [Validators.required, Validators.minLength(2)]], 
      buddyGender: ['', [Validators.required]],
      buddyType: ['', [Validators.required]],
      buddyAge: ['', [Validators.required]],
      buddyBreed: ['', [Validators.required]],
      buddyBday: ['', [Validators.required]],   
      buddyLocation: [''],   
      buddyDescription: [''],
      buddyPic: ['', [Validators.required]]
    })
  }

  submitAdoption() {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let newAdoptionBuddies = this.ionicForm.value.attributes.length
      console.log(newAdoptionBuddies)
      for (let i=0; i<newAdoptionBuddies; i++) {
        let idBuddy = this.afs.createId()
        const adoptionBuddyRef: AngularFirestoreDocument<any> = this.afs.doc(
          `adoption/${idBuddy}`
          );      
          adoptionBuddyRef.set(this.ionicForm.value.attributes[i], {
            merge: true,
          });
          adoptionBuddyRef.update({id: idBuddy}), { // add buddy id too
            merge: true
          }
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${this.userService.user.id}/inAdoption/${idBuddy}`
            ); 
          userRef.set(this.ionicForm.value.attributes[i], {
            merge: true,
          });
          userRef.update({id: idBuddy}), { // add buddy id too
            merge: true
          }
      }
    }
    this.modalCtrl.dismiss({animals: this.ionicForm.value})
  }


  onFileSelected(event, id) {
    const file = event.target.files[0]; // info de la imagen
    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.images[id] = e.target.result
    }
    reader.readAsDataURL(file) // para que aparezca la imagen en la pantalla

    this.uploadImage(event, id)
  }

  uploadImage(event, id) { // esta funcion es para subir la imagen a la base de datos
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `BuddyImages/Adoption/${this.userService.user.id}/${n}`; // path donde se va a guardar la imagen en firebase
    const fileRef = this.storage.ref(filePath);
    
    const task = this.storage.upload(filePath, file);
    this.percentage = task.percentageChanges()
    console.log('percentage', this.percentage)
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // this.ionicForm.value.attributes[id].buddyPic = this.downloadURL
          this.downloadURL.subscribe(url => {
            if (url) {
              this.imageUrl[id] = url;
              console.log('imageURL:', this.imageUrl[id], 'downloadURL:', this.downloadURL)
              // this.ionicForm.value.attributes[id].buddyPic = filePath IMAGE PATH IN DATABASE
              this.ionicForm.value.attributes[id].buddyPic = this.imageUrl[id] // URL IMAGE IN DATABASE
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          // console.log('url', url);
        }
      });
  }
  
  changeBreed(value) {
    console.log('val ', value)
    switch (value) {
      case 'Cat':
        this.hasBreed = true
        this.breeds = this.catBreeds
      break;
      case 'Dog':
        console.log(this.dogBreeds)
        this.hasBreed = true
        this.breeds = this.dogBreeds
      break;
      case 'Pig':
        this.hasBreed = true
        this.breeds = this.pigBreeds
      break;
      case 'Bird':
        this.hasBreed = true
        this.breeds = this.birdBreeds
      break;   
      case 'Rabbit':
        this.hasBreed = true
        this.breeds = this.rabbitBreeds
      break;   
      case 'Mice':
        this.hasBreed = false
      break;
      case 'Turtle':
        this.hasBreed = true
        this.breeds = this.turtleBreeds
      break;

      default:
        break;
    }
  }
  
  async getmylocation() {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
      this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude, this.options).then((
        result: NativeGeocoderResult[])=> {
          console.log("Result position = ", result)
          this.geoAddress = this.generateAddress(result[0])
          console.log('location address = ', this.geoAddress)
        }
      )
  }

    //Return Comma saperated address
    generateAddress(addressObj){
      let obj = [];
      let uniqueNames = [];
      let address = "";
      for (let key in addressObj) {

        // console.log(addressObj[key]);
        if( key!='areasOfInterest' ){
          obj.push(addressObj[key]);
        }
  
      }
  
      var i = 0;
      obj.forEach(value=>{
  
        // console.log('new foreach value:', obj[i]);
        if( uniqueNames.indexOf(obj[i]) === -1 ){
          uniqueNames.push(obj[i]);
        }
        i++;
      });
  
      uniqueNames.reverse();
      for (let val in uniqueNames) {
        if(uniqueNames[val].length)
        address += uniqueNames[val]+', ';
      }

      return address.slice(0, -2);
    }
}
