<?php
/**
 * Author box template part
 *
 * @package TechForGo
 * @since 1.0.0
 */

$author_id = get_the_author_meta( 'ID' );
?>
<section class="tfg-author-box" aria-labelledby="tfg-author-heading">
	<div class="tfg-author-avatar-wrap">
		<?php echo get_avatar( $author_id, 72, '', '', array( 'class' => 'tfg-author-avatar' ) ); ?>
	</div>
	<div class="tfg-author-content">
		<span class="tfg-author-eyebrow"><?php esc_html_e( 'About the Author', 'techforgo' ); ?></span>
		<h3 id="tfg-author-heading" class="tfg-author-name">
			<a href="<?php echo esc_url( get_author_posts_url( $author_id ) ); ?>">
				<?php the_author(); ?>
			</a>
		</h3>
		<div class="tfg-author-bio">
			<?php
			$description = get_the_author_meta( 'description' );
			if ( ! empty( $description ) ) :
				echo wp_kses_post( wpautop( $description ) );
			else :
				?>
				<p><?php esc_html_e( 'Senior technical writer and system architecture analyst at TechForGo, focusing on cloud scalability, enterprise security vectors, and next-generation compute primitives.', 'techforgo' ); ?></p>
			<?php endif; ?>
		</div>
		<div class="tfg-author-archive-link">
			<a href="<?php echo esc_url( get_author_posts_url( $author_id ) ); ?>">
				<?php printf( esc_html__( 'Read all articles by %s &rarr;', 'techforgo' ), get_the_author() ); ?>
			</a>
		</div>
	</div>
</section>
