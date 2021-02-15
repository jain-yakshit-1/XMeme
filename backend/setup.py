from setuptools import find_packages, setup

setup(
    name='XMeme',
    version='0.1.0',
    description='A Meme Streaming Application',
    author='Yakshit Ravindra Jain',
    author_email='jnana.cetana@gmail.com',
    packages=find_packages(include=['app', 'app.*']),
    include_package_data=True,
    zip_safe=False
)
