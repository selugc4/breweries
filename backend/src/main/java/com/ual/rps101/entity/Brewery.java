package com.ual.rps101.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "breweries")
public class Brewery {
    @Id
    @NotBlank(message = "Id is mandatory")
    private String id;
    
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Type is mandatory")
    private String brewery_type;

    @NotBlank(message = "Address is mandatory")
    private String address_1;

    @NotBlank(message = "City is mandatory")
    private String city;

    @NotBlank(message = "State is mandatory")
    private String state_province;

    @NotBlank(message = "Country is mandatory")
    private String country;
    
    private Double longitude;

    private Double latitude;

    private Long phone;

    @NotBlank(message = "Website is mandatory")
    private String website_url;

    public Brewery() {
    }
    public Brewery(String id, String name, String brewery_type, String address_1, String city, String state_province, String country, Double longitude, Double latitude, Long phone, String website_url) {
        this.id = id;
        this.name = name;
        this.brewery_type = brewery_type;
        this.address_1 = address_1;
        this.city = city;
        this.state_province = state_province;
        this.country = country;
        this.longitude = longitude;
        this.latitude = latitude;
        this.phone = phone;
        this.website_url = website_url;
    }
    public String getName() {
        return name;
    }
    public String getId() {
        return id;
    }
    public String getBrewery_type() {
        return brewery_type;
    }
    public String getAddress_1() {
        return address_1;
    }
    public String getCity() {
        return city;
    }
    public String getState_province() {
        return state_province;
    }
    public String getCountry() {
        return country;
    }
    public Double getLongitude() {
        return longitude;
    }
    public Double getLatitude() {
        return latitude;
    }
    public Long getPhone() {
        return phone;
    }
    public String getWebsite_url() {
        return website_url;
    }   
}
