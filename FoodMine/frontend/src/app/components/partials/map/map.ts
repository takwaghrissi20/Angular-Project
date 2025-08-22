import { Component, ElementRef, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { LocationService } from '../../../services/location';
import type { LatLng, LatLngTuple } from 'leaflet';
import { Order } from '../../../shared/models/Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  imports: [CommonModule]
})
export class MapComponent implements OnChanges, AfterViewInit {

  @Input()
  order!: Order;
  @Input()
  readonly = false;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;

  map: any;
  currentMarker: any;
  MARKER_ICON: any;

  constructor(private locationService: LocationService) {}

  ngAfterViewInit(): void {
    // ⚡ La map est créée une seule fois après que le DOM est dispo
    this.initializeMap().then(() => {
      if (this.readonly && this.addressLatlng) {
        this.showLocationOnReadonlyModel();
      }
    });
  }

  ngOnChanges(): void {
    if (!this.order) return;

    // Si la map existe déjà, on peut mettre à jour
    if (this.map && this.readonly && this.addressLatlng) {
      this.showLocationOnReadonlyModel();
    }
  }

  showLocationOnReadonlyModel() {
    if (!this.map) return;

    this.setMarker(this.addressLatlng);
    this.map.setView(this.addressLatlng, this.MARKER_ZOOM_LEVEL);

    // Désactivation des interactions
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    this.map.off('click');
    this.map.tap?.disable();
    this.currentMarker?.dragging?.disable();
  }

  // Méthode pour récupérer Leaflet SSR-safe
  private async getLeaflet(): Promise<any> {
    if (typeof window === 'undefined') return null;
    const L = await import('leaflet');
    return L;
  }

  async initializeMap() {
    const L = await this.getLeaflet();
    if (!L) return;

    // 🔒 Empêcher "Map container is already initialized"
    if (this.map) return;

    this.MARKER_ICON = L.icon({
      iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
      iconSize: [42, 42],
      iconAnchor: [21, 42]
    });

    this.map = L.map(this.mapRef.nativeElement, { attributionControl: false })
      .setView(this.DEFAULT_LATLNG, 1);

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    // Click sur la map pour ajouter/move le marker
    this.map.on('click', (e: any) => {
      const tuple: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      this.setMarker(tuple);
    });
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        const tuple: LatLngTuple = [latlng.lat, latlng.lng];
        if (this.map) {
          this.map.setView(tuple, this.MARKER_ZOOM_LEVEL);
          this.setMarker(tuple);
        }
      }
    });
  }

  /**
   * setMarker accepte maintenant un LatLng OU un LatLngTuple
   */
  async setMarker(latlng: LatLng | LatLngTuple) {
    const L = await this.getLeaflet();
    if (!L) return;

    // Normalisation → toujours un LatLng
    const point: LatLng = Array.isArray(latlng)
      ? L.latLng(latlng[0], latlng[1])
      : latlng;

    if (this.currentMarker) {
      this.currentMarker.setLatLng(point);
      this.setaddressLatlng(point);
      return;
    }

    this.currentMarker = L.marker(point, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    // Drag du marker pour mettre à jour l'adresse
    this.currentMarker.on('dragend', () => {
      const pos = this.currentMarker.getLatLng();
      this.setaddressLatlng(pos);
    });

    // Initial update de l'adresse
    this.setaddressLatlng(point);
  }

  setaddressLatlng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatlng() {
    return this.order.addressLatLng!;
  }
}
