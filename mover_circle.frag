#version 150 core
in vec2 local_frag_coord;

out vec4 out_color;

uniform float radius;
uniform vec2 center;
uniform vec3 color;

const vec3 light_intensity = vec3(0.7, 0.7, 0.7);
const vec3 light_position = vec3(0.0, 0.0, 0.8);

void main() {
    // squared 2D distance from center of gl_point
    float rad_squared = dot(local_frag_coord, local_frag_coord);

    // If outside of the 2D circle discard
    if(rad_squared > 1.0)
        discard;

    // Calculate 3D normal
    vec3 normal = normalize( vec3(local_frag_coord, sqrt(1.0 - rad_squared)));

    // GL world coordinates
    vec3 frag_position = (normal * radius) + vec3(center, 0.0);

    // Vector from frag to light
    vec3 frag_to_light = light_position - frag_position;

    // cosine of angle of incidence
    float cosAngleIncidence = clamp( dot(normal, frag_to_light) , 0, 1);

    // diffuse lighting
    vec3 sphere_color = color * light_intensity * cosAngleIncidence;

    // ambient lighting
    sphere_color += color * 0.3;

    // Specular lighting
//    sphere_color += vec3(0.7, 0.7, 0.7)*pow(cosAngleIncidence, 40.0);

    out_color = vec4(sphere_color, 1.0);
}
