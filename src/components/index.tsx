import React, { useEffect, useRef, useState } from 'react'

import 'ol/ol.css'
import { Map, View } from 'ol'
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';

const Index = () => {

	const map: React.MutableRefObject<any> = useRef()

	useEffect(() => {
		map.current = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				new TileLayer({
					source: new TileWMS({
						url: "",
						params: {},
						serverType: 'geoserver',
					}),
					opacity: 0.5
				})
			],
			view: new View({
				center: proj.fromLonLat([-83.4238639, -1.6811408]),
				zoom: 6.4,
			})
		});
	}, [])


	const handleLayer = (fullName: string, url: string) => {
		const raster = new TileLayer({
			source: new OSM(),
		})
		const vector = new TileLayer({
			source: new TileWMS({
				url: url,
				params: { 'LAYERS': fullName },
				serverType: 'geoserver',
			}),
			opacity: 0.5
		})
		map.current.setLayerGroup(new LayerGroup({ layers: [raster, vector] }))
	}

	const [data] = useState([
		{
			name: "Provincias",
			layer: "workspace:nxprovincias",
			url: "http://localhost:8081/geoserver/workspace/wms"
		},
		{
			name: "Cantones",
			layer: "workspace:nxcantones",
			url: "http://localhost:8081/geoserver/workspace/wms"
		},
		{
			name: "Parroquias",
			layer: "workspace:nxparroquias",
			url: "http://localhost:8081/geoserver/workspace/wms"
		},
		{
			name: "Vias",
			layer: "workspace:via_l",
			url: "http://localhost:8081/geoserver/workspace/wms"
		},
		{
			name: "Rios",
			layer: "workspace:rio_l",
			url: "http://localhost:8081/geoserver/workspace/wms"
		},
		{
			name: "Curvas de nivel",
			layer: "workspace:curva_nivel_l",
			url: "http://localhost:8081/geoserver/workspace/wms"
		},
	])

	return (
		<section className="body">
			<div className="inner-wrapper">
				<aside id="sidebar-left" className="sidebar-left">
					<div className="nano">
						<div className="nano-content">
							<nav id="menu" className="nav-main" role="navigation" style={{ marginTop: "20px" }}>
								<ul className="nav nav-main">
									{data.map((value, index) => (
										<li onClick={() => handleLayer(value.layer, value.url)} key={index}>
											<a href="#">
												<i className="fa fa-globe" aria-hidden="true"></i>
												<span>{value.name}</span>
											</a>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>
				</aside>
				<section role="main" className="content-body">
					<div id="map" style={{ width: "100%", height: "100%" }}></div>
				</section>
			</div>
		</section>
	)
}

export default Index
